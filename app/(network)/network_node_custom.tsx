import { reloadAsync } from 'expo-updates';
import { useState } from 'react';
import { Text, View, Alert, ScrollView } from 'react-native';

import Button from '@/components/atom/Button.js';
import Input from '@/components/atom/Input.js';
import Loading from '@/components/atom/Loading.js';
import { NetworkController } from '@/controller/NetworkController.js';
import { useLoadCurrentNetwork } from '@/hooks/useLoadCurrentNetwork.js';
import { StorageError } from '@/models/ErrorModels.js';

/** Node 選択画面より遷移。直接入力するケース */
export default function CustomInputNetworkNodePage(): JSX.Element {
  const [updating, setUpdating] = useState(false);
  const [input, setInput] = useState<string>('');
  const { network, error } = useLoadCurrentNetwork();

  if (error) {
    throw new StorageError(`SelectNetworkNodePage: Failed to load network configuration, ${error}`);
  }

  const handleSubmit = async () => {
    if (!input) {
      return;
    }

    if (network?.network.networkType) {
      try {
        setUpdating(true);

        // 正しい URL 形式か検証する、かつ接続可能か検証する
        if (await NetworkController.isHealthNode(network?.network.networkType, input)) {
          await NetworkController.setSettings(network.network.networkType, { restGatewayUrl: input });
          await reloadAsync();
        } else {
          Alert.alert('指定された URL に接続出来ませんでした。');
        }
      } catch (err) {
        console.error(`SelectNetworkNodePage: ${err}`);
      } finally {
        setUpdating(false);
      }
    }
  };

  return (
    <ScrollView>
      <View className='flex-1 px-4 pt-6 flex flex-col space-y-4'>
        <View className='pb-4 flex flex-col space-y-2'>
          <Text className='text-base'>登録するノードの URL を入力してください</Text>
          <Text numberOfLines={1}>{`接続中ノード: ${network?.network.restGatewayUrl || 'unknown'}`}</Text>
        </View>
        <Input keyboardType='url' placeholder='https://example.com:3001' value={input} onChangeText={setInput} />
        <Button onPress={handleSubmit} disabled={!input} variant={!input ? 'ghost' : 'default'}>
          {updating ? <Loading style={{ height: 100, width: 100 }} /> : !input ? '' : '確定'}
        </Button>
      </View>
    </ScrollView>
  );
}
