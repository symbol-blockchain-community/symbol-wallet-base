import { Link, useNavigation, useRouter } from 'expo-router';
import * as React from 'react';
import { View, Text, Platform } from 'react-native';

import ButtonBase from '@/components/atom/ButtonBase';
import { List } from '@/components/atom/List';
import { useLoadWallets } from '@/hooks/useLoadWallets';
import { WalletModel } from '@/models/AccountModel';
// FIXME import { AddressService } from '@/services/AddressService';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import Button from '@/components/atom/Button';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
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
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

function Item({ item }: { item: WalletModel }) {
  const router = useRouter();

  const onPressItem = () => {
    router.push(`/wallet/${item.publicKey}`);
  };

  return (
    <ButtonBase onPress={onPressItem} className='w-screen'>
      <View className='flex-col space-y-2 py-6 px-4 bg-background'>
        <Text className='text-xs text-muted-foreground absolute top-2 right-4'>{item.networkType}</Text>
        <Text className='text-xl font-semibold'>{item.name}</Text>
        <Text className='text-base'>
          {/* FIXME {AddressService.createFromPublicKey(item.publicKey, item.networkType).pretty()} */}
          AddressService.createFromPublicKey(item.publicKey, item.networkType).pretty()
        </Text>
        {/* TODO: 暫定で固定値挿入 */}
        <Text className='text-2xl text-right'>{(100000).toLocaleString('ja') + ' xym'}</Text>
      </View>
    </ButtonBase>
  );
}
export type TempType = {
  index: { id: number } | undefined;
};

export default function Root(): React.JSX.Element {
  const navigation = useNavigation();
  const { isLoading, wallets } = useLoadWallets();
  const [isWalletsInfoReload, setIsWalletsInfoReload] = React.useState<boolean>(false);

  // add push notification
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState<Notifications.Notification | undefined>(undefined);
  const notificationListener = React.useRef<Notifications.Subscription>();
  const responseListener = React.useRef<Notifications.Subscription>();

  React.useEffect(() => {
    const state = navigation.getState();
    navigation.reset({
      ...state,
      routes: state.routes.map((route) => ({ ...route, state: undefined })),
    });
  }, []);

  const testPushNotification = async () => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token || ''))
      .catch((error) => setExpoPushToken(error));
  };

  const reloadAccountInfo = () => {
    setIsWalletsInfoReload(true);
    try {
      // TODO: 実際にはノードよりアドレスに紐づく残高情報を取得する
    } catch (err) {
      console.error(err);
    } finally {
      setIsWalletsInfoReload(false);
    }
  };

  return (
    <View className='flex-1 items-center py-2'>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Link href='/_sitemap' className='text-blue-700 underline text-center py-10 text-lg'>
            開発用 - サイトマップへ
          </Link>
          <Button onPress={testPushNotification}>tset</Button>
          <List
            items={wallets}
            renderItem={(item) => <Item item={item} />}
            onRefresh={reloadAccountInfo}
            refreshing={isWalletsInfoReload}
          />
        </>
      )}
    </View>
  );
}
