import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Image, ImageProps, View } from 'react-native';

import { cn } from '@/util/classes';

const sizeVariants = cva('rounded-full overflow-hidden', {
  variants: {
    size: {
      default: 'w-10 h-10',
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface Props extends ImageProps, VariantProps<typeof sizeVariants> {}

export default function Avatar({ source, size, ...props }: Props): JSX.Element {
  return (
    <View className={cn(sizeVariants({ size }), '')}>
      <Image {...props} source={source} />
    </View>
  );
}
