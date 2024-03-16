import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { cn } from '@/util/classes';

const inputVariants = cva('border border-input px-3 rounded-md', {
  variants: {
    size: {
      default: 'py-2 text-base leading-[0px]',
      sm: 'text-sm py-1 leading-[0px]',
      lg: 'text-lg py-3 leading-[0px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface Props extends TextInputProps, VariantProps<typeof inputVariants> {}

export default function Input({ className, children, size, ...props }: Props): JSX.Element {
  return <TextInput {...props} className={cn(inputVariants({ size }), className)} />;
}
