import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';

interface Props extends PressableProps {}

export default function ButtonBase({ className, children, ...props }: Props): JSX.Element {
  return (
    <Pressable {...props}>
      {({ pressed }) => (
        <View className={pressed ? 'opacity-20' : 'opacity-100'}>
          <>{children}</>
        </View>
      )}
    </Pressable>
  );
}
