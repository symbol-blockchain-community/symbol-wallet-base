import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Pressable, Text, View, ViewProps } from 'react-native';

import { IconRadioButtonOff, IconRadioButtonOn } from '@/components/atom/Icons';
import { cn } from '@/util/classes';

const sizeVariants = cva('font-medium w-full', {
  variants: {
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
      icon: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface Props<T extends string | number | null> extends ViewProps, VariantProps<typeof sizeVariants> {
  value: T;
  onChange: (e: T) => void;
  items: T[];
  children?: never;
}

export default function RadioButton<T extends string | number | null>({
  className,
  size,
  value,
  onChange,
  items,
  ...props
}: Props<T>): JSX.Element {
  return (
    <View {...props} className={cn('flex flex-col space-y-6', className)}>
      {items.map((item, index) => (
        <Pressable key={index} onPress={() => onChange(item)}>
          {({ pressed }) => (
            <View className={cn('flex flex-row items-center space-x-4', pressed ? 'opacity-20' : undefined)}>
              {value === item ? <IconRadioButtonOn /> : <IconRadioButtonOff />}
              <Text className={cn(sizeVariants({ size }))}>{item}</Text>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}
