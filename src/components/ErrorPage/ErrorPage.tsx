import { useNavigate } from '@tanstack/react-router';
import { Frown } from 'lucide-react';

import { useError } from '@/store/error/useError';

import PageContainer from '../PageContainer';
import { Button } from '../ui/button';
import { Text } from '../ui/text';

export interface ErrorPageProps {
  message?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  const navigate = useNavigate();
  const { setError } = useError();

  const handleGoBack = () => {
    setError(null);

    navigate({ to: '/' });
  };

  return (
    <PageContainer className="justify-center items-center gap-4">
      <Frown className="w-32 h-32" />
      <Text
        as="h1"
        className="text-center"
      >
        Oops! Something went wrong
      </Text>
      {message && (
        <Text
          as="p"
          className="mt-2 text-center"
        >
          {message}
        </Text>
      )}
      <Button
        className="mt-6"
        onClick={handleGoBack}
      >
        Go back home
      </Button>
    </PageContainer>
  );
};
