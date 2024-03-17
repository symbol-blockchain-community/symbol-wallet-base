import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { View, Text, ViewProps, TextProps } from 'react-native';

import { cn } from '@/util/classes';

const cardVariants = cva('flex flex-col space-y-1 border border-input p-2', {
  variants: {
    color: {
      default: 'bg-card text-white shadow-sm',
      transparent: 'bg-transparent text-card-foreground',
      glass: 'bg-gray-200/30 backdrop-blur-lg text-card-foreground border border-gray-200/30 shadow-sm',
    },
    radius: {
      default: 'rounded-lg',
      md: 'rounded-md',
      sm: 'rounded-sm',
    },
  },
  defaultVariants: {
    color: 'default',
    radius: 'default',
  },
});

interface CardProps extends ViewProps, VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

interface CardHeaderProps extends TextProps {
  children: React.ReactNode;
}

interface CardContentProps extends ViewProps {
  children: React.ReactNode;
}

interface CardFooterProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, color, radius, className, ...props }: CardProps): JSX.Element {
  return (
    <View className={cn(cardVariants({ color, radius }), className)} {...props}>
      {children}
    </View>
  );
}

export function CardHeader({ children, className, ...props }: CardHeaderProps): JSX.Element {
  return (
    <Text className={cn('flex flex-col text-lg font-semibold text-card-foreground')} {...props}>
      {children}
    </Text>
  );
}

export function CardContent({ children, className, ...props }: CardContentProps): JSX.Element {
  return (
    <View className={cn('flex-grow', className)} {...props}>
      <Text>{children}</Text>
    </View>
  );
}

export function CardFooter({ children, className, ...props }: CardFooterProps): JSX.Element {
  return (
    <View className={cn('flex flex-row justify-end', className)} {...props}>
      {children}
    </View>
  );
}
