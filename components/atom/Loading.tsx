import LottieView from 'lottie-react-native';
import { ViewProps } from 'react-native';

import CircleProgress from '@/assets/animations/circle_progress.json';

interface Props extends ViewProps {}

export default function Loading({ style, ...props }: Props): JSX.Element {
  return <LottieView source={CircleProgress} autoPlay loop {...props} />;
}
