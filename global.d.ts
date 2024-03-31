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
