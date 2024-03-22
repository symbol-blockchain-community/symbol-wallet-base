import { FlatList, View, ViewProps } from 'react-native';

import { cn } from '@/util/classes';

type ListItemData<T> = {
  id: number | string;
} & T;

interface Props<T> {
  className?: string;
  items: ListItemData<T>[];
  renderItem: (item: T) => JSX.Element;
}

/**
 * usage
 *
 * ```tsx
 * <List
 *   items={[{id: "1", name: 'test'}]}
 *   renderItem={(item) => (
 *     <ListItem>
 *       <Text>{item.name}</Text>
 *     </ListItem>
 *   )}
 * />
 * ```
 */
export function List<T>(props: Props<T>): JSX.Element {
  return (
    <FlatList
      className={cn(props.className)}
      data={props.items}
      ItemSeparatorComponent={() => <View className='w-full h-1' />}
      renderItem={({ item }) => props.renderItem(item)}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

interface ListItemProps extends ViewProps {}

export function ListItem({ className, ...props }: ListItemProps): JSX.Element {
  return (
    <View className={cn('flex-row justify-start items-center gap-x-3 p-4', className)} {...props}>
      {props.children}
    </View>
  );
}
