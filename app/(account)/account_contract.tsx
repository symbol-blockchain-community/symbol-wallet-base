import * as MailComposer from 'expo-mail-composer';
import { Link } from 'expo-router';
import { View, Text, ScrollView, Alert } from 'react-native';

import Button from '@/components/atom/Button.js';
import { modeConfig } from '@/util/configs/mode.js';
import { generateUnsecureRandomId } from '@/util/text.js';

/** ユーザーが使用しているデフォルトの Email アプリを使用してサポートへメールを送信するためのページ */
export default function ContractPage(): JSX.Element {
  const handleStartContract = async () => {
    const canUse = await MailComposer.isAvailableAsync();
    if (!canUse) {
      Alert.alert(
        'メールアプリを起動出来ませんでした。恐れ入りますがメールアドレス support@example.com 迄直接お問合せ下さい。'
      );
    } else {
      MailComposer.composeAsync({
        recipients: ['support@example.com'],
        subject: `[${modeConfig.APPLICATION_NAME}]: ${generateUnsecureRandomId(5)} 問い合わせ`,
        body: 'お問い合わせの内容を出来るだけ詳細に記載下さい',
      });
    }
  };

  return (
    <ScrollView>
      <View className='flex-1 px-6 pt-4 space-y-4'>
        <Text className='text-base font-semibold'>サポートへの連絡</Text>
        <Text>メールを送信する前によくあるお問い合わせを確認してください</Text>
        <Link href='/account/qa' className='text-blue-700 underline'>
          よくあるお問い合わせ
        </Link>
        <View className='py-5'>
          <Button onPress={handleStartContract}>お問い合わせを開始する</Button>
        </View>
      </View>
    </ScrollView>
  );
}
