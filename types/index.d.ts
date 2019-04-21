declare var __DEV__: boolean;
declare var __BROWSER__: boolean;

declare interface NodeModule {
  hot: {
    accept(path?: string, callback?: () => void): void;
  };
}
