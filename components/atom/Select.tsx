import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

interface Props extends PickerSelectProps {
  size?: 'sm' | 'lg' | 'default';
}

export default function Select({ size = 'default', ...props }: Props): JSX.Element {
  // className を受け取れない為 style にて記述
  // フォントサイズ等の基準は Tailwind の既定値を使用
  return (
    <RNPickerSelect
      {...props}
      style={{
        inputIOS: {
          borderWidth: 1,
          borderColor: 'hsl(214, 31%, 91%)',
          borderRadius: 4,
          paddingHorizontal: 12,
          fontSize: size === 'default' ? 16 : size === 'sm' ? 14 : 18,
          paddingVertical: size === 'default' ? 8 : size === 'sm' ? 4 : 12,
        },
        inputAndroid: {
          borderWidth: 1,
          borderColor: 'hsl(214, 31%, 91%)',
          borderRadius: 4,
          paddingHorizontal: 12,
          fontSize: size === 'default' ? 16 : size === 'sm' ? 14 : 18,
          paddingVertical: size === 'default' ? 8 : size === 'sm' ? 4 : 8,
        },
      }}
    />
  );
}
