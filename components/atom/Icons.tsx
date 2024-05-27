import Entypo from '@expo/vector-icons/Entypo';
import IonIcons from '@expo/vector-icons/Ionicons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import { StyleProp, TextStyle } from 'react-native';

interface Props extends Omit<IconProps<string>, 'name'> {
  size?: 20 | 24 | 28 | 32 | 48;
  isOutline?: boolean;
  style?: StyleProp<TextStyle>;
}

export function IconAccount({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'person-circle-outline' : 'person'} size={size} />;
}

export function IconClose({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'close-circle-outline' : 'close'} size={size} />;
}

export function IconSearch({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'search-circle-outline' : 'search'} size={size} />;
}

export function IconSettings({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'settings-outline' : 'settings'} size={size} />;
}

export function IconWallet({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'wallet-outline' : 'wallet'} size={size} />;
}

export function IconContacts({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'at-circle-outline' : 'at'} size={size} />;
}

export function IconSend({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'send-outline' : 'send'} size={size} />;
}

export function IconCheck({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'checkmark-circle-outline' : 'checkmark-circle'} size={size} />;
}

export function IconArrowBack({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'arrow-back-circle-outline' : 'arrow-back-circle'} size={size} />;
}

export function IconArrowForward({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'arrow-forward-circle-outline' : 'arrow-forward-circle'} size={size} />;
}

export function IconNodes({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'git-network-outline' : 'git-network'} size={size} />;
}

export function IconServer({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'server-outline' : 'server'} size={size} />;
}

export function IconInfo({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'alert-circle-outline' : 'alert'} size={size} />;
}

export function IconQRCode({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'qr-code-outline' : 'qr-code'} size={size} />;
}

export function IconCopy({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'copy-outline' : 'copy'} size={size} />;
}

export function IconReceipt({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'receipt-outline' : 'receipt'} size={size} />;
}

export function IconDown({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons {...props} name={isOutline ? 'caret-down-circle-outline' : 'caret-down'} size={size} />;
}

export function IconLightDown({ size = 28, ...props }: Props): JSX.Element {
  return <Entypo name='light-down' size={size} {...props} />;
}

export function IconLightUp({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Entypo name='light-up' size={size} {...props} />;
}

export function IconCamera({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons name={isOutline ? 'camera-outline' : 'camera'} size={size} {...props} />;
}

export function IconCameraReverse({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons name={isOutline ? 'camera-reverse-outline' : 'camera-reverse'} size={size} {...props} />;
}

export function IconRadioButtonOn({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons name={isOutline ? 'radio-button-on-outline' : 'radio-button-on'} size={size} {...props} />;
}

export function IconRadioButtonOff({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <IonIcons name={isOutline ? 'radio-button-off-outline' : 'radio-button-off'} size={size} {...props} />;
}
