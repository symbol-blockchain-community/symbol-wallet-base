import { ScrollView, ViewProps, View } from 'react-native';

import { cn } from '@/util/classes';

export default function Container({ children, ...props }: ViewProps): JSX.Element {
  return (
    <View className='flex-1'>
      <ScrollView>
        <View {...props} className={cn('px-6 py-24', props.className)}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
}
