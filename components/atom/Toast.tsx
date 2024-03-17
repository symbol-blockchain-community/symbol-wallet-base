import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Switch as RNSwitch, SwitchProps } from 'react-native';

import { cn } from '@/util/classes';

const toastVariants = cva('shadow-sm transition-colors', {
  variants: {},
  defaultVariants: {},
});

interface Props extends SwitchProps, VariantProps<typeof toastVariants> {}

export default function Toast({ className, children, ...props }: Props): JSX.Element {
  return (
    <RNSwitch
      {...props}
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      className={cn(toastVariants(), className)}
    />
  );
}
