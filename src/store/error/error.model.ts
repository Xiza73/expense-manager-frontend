export interface ErrorState {
  error: string | null;
}

export interface ErrorStore extends ErrorState {
  setError: (error: string | null) => void;
  setErrorCallback: (error: string | null, callback: () => void) => void;
}
