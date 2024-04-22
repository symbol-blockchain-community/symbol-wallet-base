import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { SafeAreaView } from 'react-native-safe-area-context';

import { List } from '@/components/atom/List.js';

// TODO: 各アプリ開発者へ "よくあるお問い合わせは更新頻度も早いと思う為、適宜 API 等で受け取るように書き直して下さい"
const ITEMS = [
  {
    id: 0,
    question: 'question',

    answer: 'お問い合わせの説明を入力',
  },
  {
    id: 1,
    question: 'question',
    answer:
      new Array(10)
        .fill(0)
        .map(() => '### sample\n hello')
        .join('\n') + '\nend',
  },
  {
    id: 2,
    question: 'question',
    answer:
      new Array(10)
        .fill(0)
        .map(() => '### sample\n hello')
        .join('\n') + '\nend',
  },
];

function QAItem({ item }: { item: (typeof ITEMS)[number] }): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Pressable onPress={() => setOpen(!open)}>
        <View className='bg-background w-full p-4'>
          <Text className='text-lg font-semibold'>{item.question}</Text>
        </View>
      </Pressable>
      {open && (
        <View className=' w-full p-4'>
          <Markdown.default>{item.answer}</Markdown.default>
        </View>
      )}
    </>
  );
}

export default function QAPage(): JSX.Element {
  return (
    <View className='flex-1 py-4'>
      <List
        items={ITEMS}
        renderItem={(item) => <QAItem item={item} />}
        ListFooterComponent={() => (
          <SafeAreaView edges={['bottom']}>
            <View className='h-20' />
          </SafeAreaView>
        )}
      />
    </View>
  );
}
