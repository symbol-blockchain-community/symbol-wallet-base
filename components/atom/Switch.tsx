import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Switch as RNSwitch, SwitchProps } from 'react-native';

import { cn } from '@/util/classes.js';

const switchVariants = cva('shadow-sm transition-colors', {
  variants: {},
  defaultVariants: {},
});

interface Props extends SwitchProps, VariantProps<typeof switchVariants> {}

export default function Switch({ className, children, ...props }: Props): JSX.Element {
  return (
    <RNSwitch
      {...props}
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      className={cn(switchVariants(), className)}
    />
  );
}
