import 'react-native';

/**
 * declare of environment variables
 */
declare namespace NodeJS {
  interface ProcessEnv {}
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module 'react-native' {
  interface FlatListProps<ItemT> extends VirtualizedListProps<ItemT> {
    className?: string;
    tw?: string;
  }

  interface ImagePropsBase {
    className?: string;
    tw?: string;
  }

  interface ViewProps {
    className?: string;
    tw?: string;
  }

  interface TextProps {
    className?: string;
    tw?: string;
  }

  interface SwitchProps {
    className?: string;
    tw?: string;
  }

  interface InputAccessoryViewProps {
    className?: string;
    tw?: string;
  }

  interface TouchableWithoutFeedbackProps {
    className?: string;
    tw?: string;
  }
}
