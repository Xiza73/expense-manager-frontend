import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { ErrorComponentProps } from '@tanstack/router-core';
import { useEffect } from 'react';

import { Button } from '../ui/button';

export interface ErrorBoundaryProps extends ErrorComponentProps {
  message?: string;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  error,
  message = 'An error occurred',
}) => {
  const router = useRouter();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h1 className="text-2xl font-bold">{message}</h1>
      <p>{error.message}</p>
      <Button
        variant="default"
        onClick={() => {
          // Invalidate the route to reload the loader, and reset any router error boundaries
          router.invalidate();
        }}
      >
        Retry
      </Button>
    </div>
  );
};
