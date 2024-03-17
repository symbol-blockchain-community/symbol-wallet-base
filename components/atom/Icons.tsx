import Icons from '@expo/vector-icons/Ionicons';
import { StyleProp, TextStyle } from 'react-native';

interface Props {
  size?: 20 | 28 | 32 | 48;
  isOutline?: boolean;
  style?: StyleProp<TextStyle>;
}

export function IconAccount({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Icons name={isOutline ? 'person-circle-outline' : 'person'} size={size} {...props} />;
}

export function IconClose({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Icons name={isOutline ? 'close-circle-outline' : 'close'} size={size} {...props} />;
}

export function IconSearch({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Icons name={isOutline ? 'search-circle-outline' : 'search'} size={size} {...props} />;
}

export function IconSettings({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Icons name={isOutline ? 'settings-outline' : 'settings'} size={size} {...props} />;
}

export function IconWallet({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Icons name={isOutline ? 'wallet-outline' : 'wallet'} size={size} {...props} />;
}

export function IconContacts({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Icons name={isOutline ? 'at-circle-outline' : 'at'} size={size} {...props} />;
}

export function IconSend({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Icons name={isOutline ? 'send-outline' : 'send'} size={size} {...props} />;
}

export function IconCheck({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Icons name={isOutline ? 'checkmark-circle-outline' : 'checkmark-circle'} size={size} {...props} />;
}

export function IconArrowBack({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Icons name={isOutline ? 'arrow-back-circle-outline' : 'arrow-back-circle'} size={size} {...props} />;
}

export function IconArrowForward({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Icons name={isOutline ? 'arrow-forward-circle-outline' : 'arrow-forward-circle'} size={size} {...props} />;
}

export function IconNodes({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Icons name={isOutline ? 'git-network-outline' : 'git-network'} size={size} {...props} />;
}

export function IconInfo({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Icons name={isOutline ? 'alert-circle-outline' : 'alert'} size={size} {...props} />;
}

export function IconQRCode({ size = 28, isOutline = true, ...props }: Props): JSX.Element {
  return <Icons name={isOutline ? 'qr-code-outline' : 'qr-code'} size={size} {...props} />;
}
