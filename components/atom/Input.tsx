import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { cn } from '@/util/classes';

interface Props extends TextInputProps {}

export default function Input({ className, children, ...props }: Props): JSX.Element {
  return <TextInput {...props} className={cn(className)} />;
}
