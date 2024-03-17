/**
 * declare of environment variables
 */
declare namespace NodeJS {
  interface ProcessEnv {
    readonly EXPO_PUBLIC_STATICS_SERVER: string;
  }
}

declare module '*.png' {
  const value: string;
  export default value;
}
