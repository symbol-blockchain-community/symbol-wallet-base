import { Link } from 'expo-router';
import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import Avatar from '@/components/atom/Avatar';
import Button from '@/components/atom/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/atom/Card';
import Checkbox from '@/components/atom/Checkbox';
import * as Icons from '@/components/atom/Icons';
import Input from '@/components/atom/Input';
import { List, ListItem } from '@/components/atom/List';
import Loading from '@/components/atom/Loading';
import Select from '@/components/atom/Select';
import Switch from '@/components/atom/Switch';
import Tabs from '@/components/atom/Tabs';
import TextArea from '@/components/atom/Textarea';
import { AccountController } from '@/controller/AccountController';
import { STORAGE_KEYS } from '@/util/configs/storage-keys';
import { AsyncStorage } from '@/util/storages/AsyncStorage';
import { SecureStorage } from '@/util/storages/SecureStorage';

/**
 * このスクリーンは開発中に Atom Component 等を確認するための検証用です。
 */
export default function Root(): React.JSX.Element {
  return (
    <View className='flex-1'>
      <ScrollView>
        <View className='flex justify-start items-stretch gap-y-10 p-2 bg-background'>
          <Text className='font-bold'>このスクリーンは開発中に Atom Component 等を確認するための検証用です。</Text>
          <View className='flex flex-col space-y-4'>
            <Button onPress={() => AccountController.createNewPrivateKeyAccount('testnet')}>WALLET 設定追加</Button>
            <Button>WALLET 設定追加</Button>
            <Button onPress={() => new SecureStorage(STORAGE_KEYS.secure.ACCOUNT).resetSecretItem()}>
              WALLET 初期化
            </Button>
            <Button onPress={() => new AsyncStorage(STORAGE_KEYS.async.NETWORK).removeItem()}>NW 設定初期化</Button>
            <Button onPress={() => new AsyncStorage(STORAGE_KEYS.async.NODESTATISTICS).removeItem()}>
              統計サーバーキャッシュ削除
            </Button>
          </View>
          <View>
            <Text>LINK</Text>
            <Link href='/_sitemap' className='text-blue-700 underline'>
              to sitemap
            </Link>
          </View>
          <View>
            <Text>Tabs</Text>
            <Tabs
              defaultTab='tab A'
              onPress={async (t) => console.log(t)}
              tabs={[
                {
                  name: 'tab A',
                  content: <Text>A</Text>,
                },
                {
                  name: 'tab B',
                  content: <Text>B</Text>,
                },
              ]}
            />
          </View>
          <View>
            <Text>Avatar</Text>
            <Avatar source={require('@/assets/icon.png')} />
          </View>
          <View>
            <Text>Button</Text>
            <Button variant='default' onPress={() => alert('button')}>
              test
            </Button>
            <Button variant='secondary' onPress={() => alert('button')}>
              test
            </Button>
            <Button variant='ghost' onPress={() => alert('button')}>
              test
            </Button>
            <Button variant='link' onPress={() => alert('button')}>
              test
            </Button>
          </View>
          <View>
            <Text>Card</Text>
            <Card>
              <CardHeader>Header</CardHeader>
              <CardContent>
                {new Array(10)
                  .fill(0)
                  .map(() => 'contents')
                  .join(' ')}
              </CardContent>
              <CardFooter>
                <Button variant='ghost' size='icon'>
                  <Icons.IconArrowBack size={20} />
                </Button>
              </CardFooter>
            </Card>
          </View>
          <View>
            <Text>CheckBox</Text>
            <View className='flex flex-row gap-3'>
              <Checkbox />
              <Checkbox value />
            </View>
          </View>
          <View>
            <Text>Icons</Text>
            <View className='flex flex-row justify-between justify-items-start items-center flex-wrap gap-x-3 space-y-3'>
              <Icons.IconAccount style={{ width: 50 }} />
              <Icons.IconArrowBack style={{ width: 50 }} />
              <Icons.IconArrowForward style={{ width: 50 }} />
              <Icons.IconCheck style={{ width: 50 }} />
              <Icons.IconClose style={{ width: 50 }} />
              <Icons.IconContacts style={{ width: 50 }} />
              <Icons.IconInfo style={{ width: 50 }} />
              <Icons.IconNodes style={{ width: 50 }} />
              <Icons.IconQRCode style={{ width: 50 }} />
              <Icons.IconSearch style={{ width: 50 }} />
              <Icons.IconSend style={{ width: 50 }} />
              <Icons.IconSettings style={{ width: 50 }} />
              <Icons.IconWallet style={{ width: 50 }} />
            </View>
          </View>
          <View>
            <Text>Input</Text>
            <Input placeholder='入力' />
          </View>
          <View>
            <Text>Select</Text>
            <Select
              items={[
                { label: 'test1', value: 'test1' },
                { label: 'test2', value: 'test2' },
              ]}
              onValueChange={(e) => console.log(e)}
            />
          </View>
          <View>
            <Text>TextArea</Text>
            <TextArea placeholder='Input a text' />
          </View>

          <View>
            <Text>Loading</Text>
            <Loading style={{ height: 200, width: 200 }} />
          </View>
          <View>
            <Text>Switch</Text>
            <View className='flex flex-row gap-3'>
              <Switch />
              <Switch value />
            </View>
          </View>
          <View>
            <Text>Toast</Text>
            <Button onPress={() => Toast.show({ type: 'success', text1: 'Success' })}>test</Button>
          </View>
        </View>
      </ScrollView>
      <View className='bg-white border'>
        <Text>List</Text>
        <Text className='text-xs'>
          注意 Scroll View と RN FlatList は Nest できません。ページ内で FlatList or Scroll View といった二者択一とする
        </Text>
        <List
          items={new Array(2).fill(0).map((_, i) => ({ name: 'test', id: i }))}
          renderItem={(e) => (
            <ListItem>
              <Avatar source={require('@/assets/icon.png')} />
              <Text>{e.name}</Text>
            </ListItem>
          )}
        />
      </View>
    </View>
  );
}
