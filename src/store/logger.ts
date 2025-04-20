import { type StateCreator, type StoreMutatorIdentifier } from 'zustand';

type Logger = <
  T,
  Mps extends Array<[StoreMutatorIdentifier, unknown]> = [],
  Mcs extends Array<[StoreMutatorIdentifier, unknown]> = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = <T>(
    ...a: [T | Partial<T> | ((state: T) => T | Partial<T>)]
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set(...(a as [any]));
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log(...(name ? [`${name}:`] : []), get());
    }
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as Logger;
