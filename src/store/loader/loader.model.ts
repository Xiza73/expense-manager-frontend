export interface LoaderState {
  activeLoaders: number;
  isFetching: boolean;
  hideLoader: boolean;
}

export interface LoaderStore extends LoaderState {
  pushLoader: (hideLoader?: boolean) => void;
  popLoader: () => void;
  setIsFetching: (isFetching: boolean) => void;
}
