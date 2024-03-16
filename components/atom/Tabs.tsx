import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Pressable, PressableProps, Text, View, ViewProps } from 'react-native';

import { cn } from '@/util/classes';

const tabsVariants = cva('flex flex-row gap-x-0 p-1 bg-muted rounded-md w-full mb-1', {
  variants: {},
  defaultVariants: {},
});

const buttonsVariants = cva(
  'inline-flex items-center justify-center flex-1 whitespace-nowrap rounded-md ring-offset-background transition-colors disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-background shadow-sm',
        muted: 'bg-transparent',
      },
      size: {
        default: 'h-9 rounded-md px-3',
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
      default: 'text-primary',
      muted: 'text-gray-500',
    },
    size: {
      default: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface Props extends VariantProps<typeof tabsVariants> {
  buttonProps?: PressableProps;
  containerProps?: ViewProps;
  /** タブ名を name, 表示するコンテンツを content に指定します */
  tabs: { name: string; content: React.ReactNode }[];
  /** 現在のタブ名を指定します。tabs のキーと同じ値を指定してください */
  defaultTab: string;
  /** タブの切り替え時に呼び出されます */
  onPress?: (tabName: string) => Promise<void>;
  children?: never;
}
interface ButtonProps extends PressableProps, VariantProps<typeof buttonsVariants> {}

function Button({ className, size, children, variant, ...props }: ButtonProps): JSX.Element {
  return (
    <Pressable {...props} className={cn(buttonsVariants({ variant, size, className }))}>
      {typeof children === 'string' ? (
        <Text className={cn(textVariants({ variant, size, className }))}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export default function Tabs({ containerProps, buttonProps, defaultTab, onPress, tabs }: Props): JSX.Element {
  const [currentTab, setCurrentTab] = React.useState<string>(defaultTab);

  const handlePressTab = (tabName: string) => {
    if (onPress) {
      onPress(tabName).then(() => setCurrentTab(tabName));
    } else {
      setCurrentTab(tabName);
    }
  };

  return (
    <>
      <View {...containerProps} className={cn(tabsVariants(), containerProps?.className)}>
        {tabs?.map((tab, index) => (
          <Button
            key={index.toString()}
            {...buttonProps}
            variant={currentTab === tab.name ? 'default' : 'muted'}
            onPress={() => handlePressTab(tab.name)}
          >
            {tab.name}
          </Button>
        ))}
      </View>
      {tabs?.find((tab) => tab.name === currentTab)?.content}
    </>
  );
}
