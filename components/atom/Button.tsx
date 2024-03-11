import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

import { cn } from '@/util/classes';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        outline: 'border border-input ',
        secondary: 'bg-secondary',
        ghost: '',
        link: '',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const textVariants = cva('font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground font-semibold',
      outline: '',
      secondary: 'text-secondary-foreground font-semibold',
      ghost: '',
      link: 'text-blue-700 underline',
    },
    size: {
      default: 'text-sm',
      sm: 'text-sm',
      lg: 'text-lg',
      icon: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface Props extends PressableProps, VariantProps<typeof buttonVariants> {}

export default function Button({ className, size, children, variant, ...props }: Props): JSX.Element {
  return (
    <Pressable {...props} className={cn(buttonVariants({ variant, size, className }), '')}>
      {typeof children === 'string' ? (
        <Text className={cn(textVariants({ variant, size, className }), '')}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
