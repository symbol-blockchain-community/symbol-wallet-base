import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Avatar from '@/components/atom/Avatar';
import Button from '@/components/atom/Button';
import Checkbox from '@/components/atom/Checkbox';
import { List, ListItem } from '@/components/atom/List';
import Loading from '@/components/atom/Loading';
import { useI18n } from '@/hooks/useI18n';
import { MnemonicService } from '@/services/MnemonicService';
import { PrivateKeyService } from '@/services/PrivateKeyService';
import { WalletService } from '@/services/WalletService';
import { useStateContext } from '@/states/context';

interface AccountItem {
  id: number;
  privateKey: PrivateKeyService;
  checked: boolean;
}

type ItemProps = {
  item: AccountItem;
  setAccounts: React.Dispatch<React.SetStateAction<AccountItem[]>>;
};

function Item({ item, setAccounts }: ItemProps): JSX.Element {
  const { state } = useStateContext();
  const { networkType } = state;

  const handleChenge = () => {
    setAccounts((accounts) => {
      const newAccounts = [...accounts];
      newAccounts[item.id].checked = !newAccounts[item.id].checked;
      return newAccounts;
    });
  };

  return (
    <Pressable onPress={handleChenge}>
      <ListItem className='max-w-full space-x-3'>
        <Checkbox value={item.checked} onTouchStart={handleChenge} />
        <View className='pr-3'>
          <Text className='text-base'>{item.privateKey.getAddress(networkType).pretty()}</Text>
        </View>
      </ListItem>
    </Pressable>
  );
}

const GENERATE_ADDRESS_COUNT = 3;

export default function LoginImported(): JSX.Element {
  const { t } = useI18n();
  const router = useRouter();
  const [accounts, setAccounts] = useState<AccountItem[]>([]);
  const isAccountSelected = accounts.filter((e) => e.checked).length > 0;
  const { state } = useStateContext();
  const { networkType } = state;

  const [isCreating, setIsCreating] = useState(false);
  const [offset, setOffset] = useState(0);

  const loadKeys = async () => {
    // SecureStorage より保存されているニーモニックを取り出し、読み込み可能なアドレスを10件表示する
    try {
      setIsCreating(true);
      const value = await MnemonicService.getFromStorage();
      if (!value) return;

      const end = offset + GENERATE_ADDRESS_COUNT;
      // FIXME: 1アドレス当たり3.5秒ほどかかる
      const keys = MnemonicService.generateFromPhrase(value.mnemonic).getChildPrivateKeys(offset, end - 1, networkType);

      setAccounts([
        ...accounts,
        ...keys.map((key, index) => {
          const privateKey = new PrivateKeyService(key);
          return {
            id: offset + index,
            privateKey,
            checked: false,
          };
        }),
      ]);
      setOffset(end);
    } catch (error) {
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const handleLoadMore = async () => {
    // 時間かかるうちは少しずつアドレスを生成する
    loadKeys();
  };

  const handleComplete = async () => {
    // 選択されたアカウントをストレージへ保管する
    const selected = accounts.filter((e) => e.checked);
    await Promise.all(
      selected.map(async (account) => {
        const model = await account.privateKey.setToStorage(networkType);
        WalletService.setNewFullWallet(model);
      })
    );
    router.push('/login/complete');
  };

  useEffect(() => {
    loadKeys();
  }, []);

  useEffect(() => {
    if (accounts.length === 0) return;
    // TODO Address に紐づく残高をそれぞれ表示する
    console.debug('on change accounts'); // Lint対策
  }, [accounts]);

  return (
    <SafeAreaView className='flex-1 flex flex-col items-center p-6'>
      <View className='flex flex-col items-center'>
        <Avatar source={require('@/assets/icon.png')} size='lg' />
      </View>
      <Button
        className='w-full max-w-sm my-6'
        variant={isAccountSelected ? 'default' : 'ghost'}
        onPress={handleComplete}
        disabled={!isAccountSelected}
      >
        {isAccountSelected ? t('common.next') : t('pages.login.imported.title')}
      </Button>
      {accounts.length > 0 && (
        <List
          items={accounts}
          renderItem={(item) => <Item item={item} setAccounts={setAccounts} />}
          ListFooterComponent={() => <SafeAreaView edges={['bottom']} />}
        />
      )}
      {isCreating && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Text>{t('pages.login.imported.is_creating')}</Text>
          <Loading style={{ width: '100%', maxWidth: 200, height: 200 }} />
        </View>
      )}
      {accounts.length > 0 && !isCreating && (
        <Button
          className='w-full max-w-sm my-6'
          variant={isAccountSelected ? 'default' : 'ghost'}
          onPress={handleLoadMore}
        >
          {t('pages.login.imported.load_more')}
        </Button>
      )}
    </SafeAreaView>
  );
}
