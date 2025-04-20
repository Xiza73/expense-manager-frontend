export interface ErrorState {
  error: string | null;
}

export interface ErrorStore extends ErrorState {
  setError: (error: string | null) => void;
}
