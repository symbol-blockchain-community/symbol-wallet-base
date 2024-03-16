import { FlatList, View, ViewProps } from 'react-native';

import { cn } from '@/util/classes';

interface Props<T extends object> {
  className?: string;
  items: T[];
  renderItem: (item: T) => JSX.Element;
}

/**
 * usage
 *
 * ```tsx
 * <List
 *   items={[{name: 'test'}]}
 *   renderItem={(item) => (
 *     <ListItem>
 *       <Text>{item.name}</Text>
 *     </ListItem>
 *   )}
 * />
 * ```
 */
export function List<T extends object>(props: Props<T>): JSX.Element {
  return (
    <FlatList
      className={cn(props.className)}
      data={props.items.flatMap((item, index) => ({ id: index.toString(), ...item }))}
      ItemSeparatorComponent={() => <View className='border border-input w-full' />}
      renderItem={({ item }) => props.renderItem(item)}
      keyExtractor={(item) => item.id}
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
