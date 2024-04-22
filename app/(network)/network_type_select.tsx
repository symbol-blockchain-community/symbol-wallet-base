import { reloadAsync } from 'expo-updates';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/atom/Button.js';
import Loading from '@/components/atom/Loading.js';
import RadioButton from '@/components/atom/RadioButton.js';
import { NetworkController } from '@/controller/NetworkController.js';
import { useLoadCurrentNetwork } from '@/hooks/useLoadCurrentNetwork.js';
import { StorageError } from '@/models/ErrorModels.js';
import { NetworkType } from '@/models/NetworkModels.js';

export default function SelectNetworkTypePage(): JSX.Element {
  const [selectedValue, setSelectedValue] = useState<NetworkType | null>(null);
  const [updating, setUpdating] = useState(false);
  const { isLoading, error, network } = useLoadCurrentNetwork();

  useEffect(() => {
    if (network?.network.networkType) {
      setSelectedValue(network.network.networkType);
    }
  }, [network]);

  /**
   * NetworkType の変更を確定させる。
   * Node が未定義の場合は統計サーバーよりランダムにノードを選択する
   * 書き込みが完了後、リロードする
   */
  const handleSubmit = async (): Promise<void> => {
    if (selectedValue) {
      setUpdating(true);
      await NetworkController.switchNetworkType(selectedValue);
      setUpdating(false);
      await reloadAsync();
    }
  };

  if (error) {
    throw new StorageError('Failed to load network configuration');
  }

  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView>
        <View className='flex-1 flex items-start space-y-6 p-4'>
          <RadioButton items={['mainnet', 'testnet']} value={selectedValue} onChange={setSelectedValue} />
          <Button
            className='w-full'
            disabled={!selectedValue || updating}
            variant={!selectedValue ? 'ghost' : 'default'}
            onPress={handleSubmit}
          >
            {isLoading || updating ? <Loading style={{ height: 100, width: 100 }} /> : '確定'}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
