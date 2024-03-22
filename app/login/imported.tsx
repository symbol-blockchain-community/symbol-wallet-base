import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import Avatar from '@/components/atom/Avatar';
import Button from '@/components/atom/Button';
import Checkbox from '@/components/atom/Checkbox';
import { List, ListItem } from '@/components/atom/List';
import { useI18n } from '@/hooks/useI18n';

interface AccountItem {
  id: number;
  address: string;
  checked: boolean;
}

type ItemProps = {
  item: AccountItem;
  setAccounts: React.Dispatch<React.SetStateAction<AccountItem[]>>;
};

function Item({ item, setAccounts }: ItemProps): JSX.Element {
  const handleChenge = () => {
    setAccounts((accounts) => {
      const newAccounts = [...accounts];
      newAccounts[item.id].checked = !newAccounts[item.id].checked;
      return newAccounts;
    });
  };

  return (
    <Pressable onPress={handleChenge}>
      <ListItem className='pr-10'>
        <Checkbox value={item.checked} onTouchStart={handleChenge} />
        <Text className='whitespace-normal text-base'>{item.address}</Text>
      </ListItem>
    </Pressable>
  );
}

export default function LoginImported(): JSX.Element {
  const { t } = useI18n();
  const router = useRouter();
  const [accounts, setAccounts] = useState<AccountItem[]>([]);

  const handleComplete = () => {
    // TODO: 選択されたアカウントをストレージへ保管する
    console.log(accounts.filter((e) => e.checked));
    router.push('/login/complete');
  };

  useEffect(() => {
    // SecureStorage より保存されているニーモニックを取り出し、読み込み可能なアドレスを10件表示する
    // かつ Address に紐づく残高をそれぞれ表示する
    setAccounts(
      new Array(10)
        .fill(0)
        .map((_, i) => ({ address: 'TDPMFTGJXYAZJMQEGMWNRXMIBR4ZTG5MF2G5RIA' + i, checked: false, id: i }))
    );
  }, []);

  return (
    <View className='flex-1 flex flex-col flex-grow justify-between items-center gap-3 px-6 py-24'>
      <View className='flex flex-col items-center'>
        <Avatar source={require('@/assets/icon.png')} size='lg' />
      </View>
      <View className='py-12'>
        <Text className='text-base'>{t('login.imported.title')}</Text>
      </View>
      {accounts.length > 0 && (
        <Button variant='default' className='w-full max-w-sm' onPress={handleComplete}>
          {t('common.next')}
        </Button>
      )}
      <View className='flex flex-grow flex-col justify-start space-y-8 w-full max-w-sm'>
        <List items={accounts} renderItem={(item) => <Item item={item} setAccounts={setAccounts} />} />
      </View>
    </View>
  );
}
