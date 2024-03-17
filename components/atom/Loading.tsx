import LottieView from 'lottie-react-native';
import { ViewProps } from 'react-native';

import CircleProgress from '@/assets/animations/circle_progress.json';

interface Props extends ViewProps {}

export default function Loading({ style, ...props }: Props): JSX.Element {
  // className 指定不可のため、使用する場合は View 等で包むこと
  return <LottieView {...props} source={CircleProgress} autoPlay loop style={style} />;
}
