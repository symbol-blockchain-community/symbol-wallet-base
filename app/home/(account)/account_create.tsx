import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/atom/Button';
import ButtonBase from '@/components/atom/ButtonBase';
import Input from '@/components/atom/Input';
import { List, ListItem } from '@/components/atom/List';
import Tabs from '@/components/atom/Tabs';

interface AccountItem {
  id: number;
  address: string;
}

function AccountImportTab(): JSX.Element {
  const handleSubmit = () => {
    // 登録
  };

  return (
    <ScrollView>
      <View className='py-4'>
        <Text className='pb-2'>アカウント名</Text>
        <Input placeholder='任意のアカウント名を入力' />
      </View>
      <View className='py-4'>
        <Text className='pb-2'>秘密鍵</Text>
        <Input placeholder='秘密鍵を入力してください' />
      </View>
      <View className='py-4'>
        <Button onPress={handleSubmit}>登録</Button>
      </View>
    </ScrollView>
  );
}

function AccountAddTab(): JSX.Element {
  const [accounts, setAccounts] = useState<AccountItem[]>([]);

  useEffect(() => {
    // SecureStorage より保存されているニーモニックを取り出し、読み込み可能なアドレスを10件表示する
    // かつ Address に紐づく残高をそれぞれ表示する
    setAccounts(
      new Array(20)
        .fill(0)
        .map((_, i) => ({ address: 'TDPMFTGJXYAZJMQEGMWNRXMIBR4ZTG5MF2G5RIA' + i, checked: false, id: i }))
    );
  }, []);

  const handleSubmit = (id: number) => {
    // 登録
    console.log(id);
  };

  return (
    <>
      <View className='py-4'>
        <Text className='pb-2'>アカウント名</Text>
        <Input placeholder='任意のアカウント名を入力' />
      </View>
      <Text className='py-4 pb-2'>追加したいアカウントを選択して下さい</Text>
      <List
        items={accounts}
        ListFooterComponent={() => (
          <SafeAreaView edges={['bottom']}>
            <View className='h-10' />
          </SafeAreaView>
        )}
        renderItem={(item) => (
          <ButtonBase onPress={() => handleSubmit(item.id)}>
            <ListItem className='max-w-full space-x-3 rounded-md border border-input'>
              <View className='pr-3'>
                <Text className='text-base'>{item.address}</Text>
              </View>
            </ListItem>
          </ButtonBase>
        )}
      />
    </>
  );
}

/** ニーモニックに紐づくアカウントの追加、または秘密鍵での import に対応します。 */
export default function AccountCreatePage(): JSX.Element {
  return (
    <View className='flex-1 p-4 flex flex-col items-stretch justify-start bg-background'>
      <Tabs
        defaultTab='add'
        tabs={[
          {
            name: 'add',
            content: <AccountAddTab />,
          },
          { name: 'import', content: <AccountImportTab /> },
        ]}
      />
    </View>
  );
}
