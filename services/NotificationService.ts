import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { InvalidValueError, PermissionError, UnexpectedError } from '@/models/ErrorModels';
import { STORAGE_KEYS } from '@/util/configs/storage-keys';
import { AsyncStorage } from '@/util/storages/AsyncStorage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export class NotificationService extends AsyncStorage {
  constructor() {
    super(STORAGE_KEYS.async.NOTIFICATION);
  }

  /**
   * push token を削除する
   */
  public async removePushToken(): Promise<void> {
    await this.removeItem();
    // TODO: サーバーサイドにも削除リクエストを送信する
  }

  /**
   * push token を更新する。
   * ローカルに保存されている push token と新たな token を比較し、異なる場合は AsyncStorage を更新の上、サーバーサイドにも新しい token を送信する。
   */
  private async updatePushToken(token: string): Promise<void> {
    const currentToken = await this.getItem();
    if (!currentToken || currentToken !== token) {
      await this.setItem(token);
      // TODO: サーバーサイドにも新しい token を送信する
    }
  }

  /**
   * プッシュ通知の登録を行う非同期関数。
   *
   * @returns {Promise<string | PermissionError | UnexpectedError>} プッシュ通知トークン、権限エラー、または予期しないエラーのいずれかを返します。
   *
   * @throws {PermissionError} プッシュ通知の権限が拒否された場合にスローされます。
   * @throws {UnexpectedError} 予期しないエラーが発生した場合にスローされます。
   */
  async registerForPushNotificationsAsync(): Promise<string | PermissionError | UnexpectedError> {
    try {
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        // 通知が許可されていない場合は許可を求めます。
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        // 通知が許可されていない場合はエラーを出力します。
        if (finalStatus !== 'granted') {
          console.error('NotificationService: Permission not granted to get push token for push notification!');
          return new PermissionError('Permission not granted to get push token for push notification!');
        }
        // EAS Project ID が正しく取得できない場合はエラーを出力します。
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          console.error('NotificationService: Project ID not found');
          return new UnexpectedError('Project ID not found');
        }
        try {
          // EAS による Push 通知通知 token を取得します。
          const pushTokenString = await Notifications.getExpoPushTokenAsync({ projectId });
          await this.updatePushToken(pushTokenString.data);
          console.debug(`NotificationService: push token updated: ${pushTokenString.data}`);
          return pushTokenString.data;
        } catch (e: unknown) {
          console.error(`NotificationService: ${e}`);
          return new UnexpectedError(`${e}`);
        }
      } else {
        // expo go 等のシミュレーターでの実行時にはエラーを出力します。
        console.debug(`NotificationService: Must use physical device for push notifications`);
        return new UnexpectedError('Must use physical device for push notifications');
      }
    } catch (e) {
      console.error(`NotificationService: ${e}`);
      return new UnexpectedError(`${e}`);
    }
  }

  /**
   * Sends a push notification to me.
   *
   * @param {string} title - The title of the notification.
   * @param {string} body - The body of the notification. Recommended to keep it under a few hundred characters.
   * @param {object} data - Additional data to send with the notification.
   */
  async sendPushNotification(title: string, body: string, data: object): Promise<InvalidValueError | 'ok'> {
    const token = await this.getItem();

    if (!token) {
      return new InvalidValueError('Push token not found');
    }

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: token,
        sound: 'default',
        title,
        body,
        data,
      }),
    });

    return 'ok';
  }
}
