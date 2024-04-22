import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { cn } from '@/util/classes.js';

const textAreaVariants = cva(
  'flex min-h-[60px] max-h-[300px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm',
  {
    variants: {},
    defaultVariants: {},
  }
);

interface Props extends TextInputProps, VariantProps<typeof textAreaVariants> {}

export default function TextArea({ className, children, ...props }: Props): JSX.Element {
  return <TextInput {...props} multiline className={cn(textAreaVariants(), className)} />;
}

TextArea.displayName = 'TextArea';
