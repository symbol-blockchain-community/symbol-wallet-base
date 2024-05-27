import { useEffect, useState } from 'react';
import { View, ScrollView, Text, PressableProps, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/atom/Button';
import ButtonBase from '@/components/atom/ButtonBase';
import { Card, CardFooter, CardHeader } from '@/components/atom/Card';
import Dialog from '@/components/atom/Dialog';
import { IconDown } from '@/components/atom/Icons';
import Input from '@/components/atom/Input';
import { List, ListItem } from '@/components/atom/List';
import Loading from '@/components/atom/Loading';
import { useGetCurrentBalance } from '@/hooks/useGetCurrentBalance';
import { useLoadCurrentNetwork } from '@/hooks/useLoadCurrentNetwork';
import { useLoadWallets } from '@/hooks/useLoadWallets';
import { WalletModel } from '@/models/AccountModel';
import { NetworkType } from '@/models/NetworkModels';
// FIXME import { AddressService } from '@/services/AddressService';

function useHooks() {
  const loadWallets = useLoadWallets();
  const loadNetworks = useLoadCurrentNetwork();

  return {
    isLoading: loadWallets.isLoading || loadNetworks.isLoading,
    error: loadWallets.error || loadNetworks.error,
    wallets: loadWallets.wallets.filter((e) => e.networkType === loadNetworks.network?.network.networkType),
    connection: loadNetworks.network?.connection,
    restGateway: loadNetworks.network?.network.restGatewayUrl,
    networkType: loadNetworks.network?.network.networkType,
  };
}

function AccountBalanceView({
  publicKey,
  node,
  networkType,
  onPress,
  ...props
}: { publicKey?: string; node?: string; networkType?: NetworkType } & PressableProps): JSX.Element {
  // FIXME const address = publicKey && networkType ? AddressService.createFromPublicKey(publicKey, networkType) : null;
  // FIXME const { isLoading, error, balance } = useGetCurrentBalance(address?.plain() || null, node || null);
  const { isLoading, error, balance } = useGetCurrentBalance(null, node || null);

  // 表記の調整。小数点以下の表示桁数指定
  const amount = balance.toLocaleString('ja', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });

  return (
    <ButtonBase onPress={onPress} {...props}>
      <Card className='w-full p-4' color='default'>
        <View className='flex flex-row items-center'>
          <View className='flex-grow flex flex-row items-center'>
            <IconDown size={20} isOutline={false} className='text-muted-foreground' />
            <Text className='text-sm text-left text-muted-foreground'>アカウント切り替え</Text>
          </View>
          <Text className='text-sm text-right text-muted-foreground'>{networkType || '--'}</Text>
        </View>
        {/* FIXME <CardHeader>{address ? address.pretty() : '--'}</CardHeader> */}
        <CardHeader>--</CardHeader>
        <CardFooter>
          <Text className='text-2xl'>{isLoading ? <Loading /> : error ? '0.00' : `${amount} xym`}</Text>
        </CardFooter>
      </Card>
    </ButtonBase>
  );
}

export default function CreateTransactionPage(): JSX.Element {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentWallet, setCurrentWallet] = useState<WalletModel | null>(null);
  const { isLoading, error, wallets, networkType, connection, restGateway } = useHooks();

  useEffect(() => {
    if (isLoading || error) return;
    if (!currentWallet && wallets.length !== 0) {
      setCurrentWallet(wallets[0]);
    }
    if (connection === 'disconnected') {
      Alert.alert(
        'ネットワークに接続されていません。トランザクションを発行したい場合、ネットワーク接続、または接続先のノードの状態を確認して下さい'
      );
    }
  }, [wallets]);

  return (
    <>
      <ScrollView>
        <SafeAreaView edges={['bottom']} className='flex-1 flex flex-col px-4 pt-4 pb-16 space-y-6'>
          <AccountBalanceView
            onPress={() => setModalVisible(true)}
            publicKey={currentWallet?.publicKey}
            networkType={networkType}
            node={restGateway}
          />
          <View>
            <Text className='pb-2'>宛先</Text>
            <Input placeholder='address' />
          </View>
          <View>
            <Text className='pb-2'>数量</Text>
            <Input placeholder='amount' keyboardType='number-pad' />
          </View>
          <View>
            <Text className='pb-2'>モザイク</Text>
            <Input placeholder='amount' keyboardType='number-pad' />
          </View>
          <View>
            <Text className='pb-2'>手数料</Text>
            <Input placeholder='amount' keyboardType='number-pad' />
          </View>
          <View>
            <Text className='pb-2'>メッセージ</Text>
            <Input placeholder='amount' keyboardType='number-pad' />
          </View>
          <View>
            <Text className='pb-2'>暗号化</Text>
            <Input placeholder='amount' keyboardType='number-pad' />
          </View>
          <View>
            <Button>確定</Button>
          </View>
        </SafeAreaView>
      </ScrollView>
      <Dialog modalVisible={modalVisible} onClose={setModalVisible}>
        <Text className='text-lg text-center'>アカウントを選択して下さい</Text>
        <List
          items={wallets}
          refreshing={false}
          ListFooterComponent={() => <View className='h-10' />}
          renderItem={(item) => (
            <ButtonBase
              onPress={() => {
                setCurrentWallet(item);
                setModalVisible(false);
              }}
            >
              <ListItem>
                <Text>
                  {/* FIXME {networkType ? AddressService.createFromPublicKey(item.publicKey, networkType).pretty() : '--'} */}
                  --
                </Text>
              </ListItem>
            </ButtonBase>
          )}
        />
        <Button variant='ghost' onPress={() => setModalVisible(!modalVisible)}>
          Close
        </Button>
      </Dialog>
    </>
  );
}
