import { SetStateAction, useEffect, useRef, useState } from 'react';

type Callback<T> = (value: T) => void;

export function useStateCallback<T>(
  initialState: T,
): [T, (value: SetStateAction<T>, callback?: Callback<T>) => void] {
  const [state, setState] = useState(initialState);
  const callbackRef = useRef<Callback<T> | null>(null);

  const setStateCallback = (
    value: SetStateAction<T>,
    callback?: Callback<T>,
  ) => {
    callbackRef.current = callback ?? null;
    setState(value);
  };

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  return [state, setStateCallback];
}
