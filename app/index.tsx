import crypto from 'crypto-browserify';
import { getRandomBytes } from 'expo-crypto';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { Button, View, Text } from 'react-native';

import { useI18n } from '@/hooks/useI18n';
import { useLoadCurrentNetwork } from '@/hooks/useLoadCurrentNetwork';

export default function Root(): React.JSX.Element {
  // const { t, locale, setLocale } = useI18n();
  // const toggleLanguage = () => {
  //   const lang = locale === 'en' ? 'ja' : 'en';
  //   setLocale(lang);
  // };

  // const { isLoading, network } = useLoadCurrentNetwork();

  // useEffect(() => {
  //   if (!isLoading && network) {
  //     console.log(network.network.restGatewayUrl);
  //   } else {
  //     console.log('no network');
  //   }
  // }, [isLoading]);

  useEffect(() => {
    // 暗号化鍵と初期化ベクトルを生成
    const key = getRandomBytes(32);
    const iv = getRandomBytes(16);

    // 暗号化オブジェクトを作成
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // データを暗号化
    const data = Buffer.from('This is some secret data');
    let encryptedData = cipher.update(data);
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);

    // 暗号化されたデータをBase64でエンコード
    const base64EncryptedData = encryptedData.toString('base64');

    // 復号化オブジェクトを作成
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    // 暗号化されたデータを復号化
    let decryptedData = decipher.update(base64EncryptedData, 'base64');
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);

    // 復号化されたデータを文字列に変換
    const originalData = decryptedData.toString();

    console.log('Original data:', originalData);
    console.log('Encrypted data:', base64EncryptedData);
    console.log('Decrypted data:', originalData);
  }, []);

  return (
    <View className='flex-1 justify-center items-center gap-3'>
      <Text className='font-bold'>wallet 一覧と情報の表示</Text>
      <Text>未ログイン時は /login へリダイレクト</Text>
      <Text>詳細 Navigation は Drawer で</Text>
      <Link href='/_sitemap' className='text-blue-700 underline'>
        to sitemap
      </Link>
      {/* <Button title='言語を切り替え' onPress={toggleLanguage} /> */}
      {/* <Button
        title='ws'
        onPress={() => {
          const url = 'wss://04.symbol-node.net:3001/ws';
          const ws = new WebSocket(url);
          ws.onopen = () => {
            console.log('start');
          };
          ws.onclose = () => {
            console.log('end');
          };
          ws.onmessage = (message: any) => {
            const res = JSON.parse(message.data);
            if ('uid' in res) {
              console.log('uid', res);
            } else {
              console.log('topic', res);
              ws.close();
            }

            // const statusFlag: string = `status/${plainAddress}`;
            // const confirmedFlag: string = `confirmedAdded/${plainAddress}`;
            // if ('uid' in res) {
            //   const body1: { [key: string]: string } = { uid: res.uid, subscribe: statusFlag };
            //   const body2: { [key: string]: string } = { uid: res.uid, subscribe: confirmedFlag };
            //   ws.send(JSON.stringify(body1));
            //   ws.send(JSON.stringify(body2));
            // } else {
            //   if (res.topic === statusFlag) {
            //     if (res.data.hash === signedTransactionHash) {
            //       ws.close();
            //       reject(new Error(res.data.code));
            //     }
            //   } else if (res.topic === confirmedFlag) {
            //     if (res.data.meta.hash === signedTransactionHash) {
            //       ws.close();
            //       resolve(res);
            //     }
            //   }
            // }
          };
          console.log(WebSocket);
        }}
      />
      <Text>言語:{locale}</Text>
      <Text>秘密鍵を翻訳→→{t('common.privateKey')}</Text> */}
    </View>
  );
}
