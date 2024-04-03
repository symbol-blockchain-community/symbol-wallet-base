import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LicenseFile from '@/assets/json/licenses.json';
import { List } from '@/components/atom/List';

/**
 * 使用している OSS ツールのライセンス一覧
 * 使用する JSON ファイルを更新する場合は npm run bin:licenses を実行する
 */
export default function LicensePage(): JSX.Element {
  return (
    <View className='flex-1 px-3 pt-4 justify-center items-start '>
      <List
        items={Object.keys(LicenseFile).map((e, i) => ({
          id: i,
          name: e,
          licenses: LicenseFile[e as keyof typeof LicenseFile].licenses,
          publisher: ((LicenseFile[e as keyof typeof LicenseFile] as any).publisher as string) || 'unknown',
          url:
            ((LicenseFile[e as keyof typeof LicenseFile] as any).repository as string) ||
            ((LicenseFile[e as keyof typeof LicenseFile] as any).url as string) ||
            'unknown',
        }))}
        renderItem={(item) => (
          <Link href={item.url === 'unknown' ? '/' : item.url} className='p-4 rounded-md border border-input'>
            <View>
              <Text className='text-base font-semibold'>{item.name}</Text>
              <Text className='text-base'>{`${item.publisher} (${item.licenses})`}</Text>
              <Text className='text-base'>{item.url}</Text>
            </View>
          </Link>
        )}
        refreshing={false}
        ListFooterComponent={() => <SafeAreaView edges={['bottom']} />}
      />
    </View>
  );
}
