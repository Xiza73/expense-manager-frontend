import { useBlocker, useNavigate } from '@tanstack/react-router';
import { Frown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useStateCallback } from '@/hooks/useStateCallback';
import { useError } from '@/store/error/useError';

import PageContainer from '../PageContainer';
import { Button } from '../ui/button';
import { Text } from '../ui/text';

export interface ErrorPageProps {
  message?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [block, setBlock] = useStateCallback<boolean>(true);
  const { setError } = useError();

  useBlocker({
    shouldBlockFn: () => Boolean(block),
    enableBeforeUnload: false,
    withResolver: true,
  });

  const handleGoBack = () => {
    setBlock(false, async () => {
      await navigate({ to: '/' });

      setError(null);
    });
  };

  return (
    <PageContainer className="justify-center items-center gap-4">
      <Frown className="w-32 h-32" />
      <Text
        as="h1"
        className="text-center"
      >
        {t('oops_something_went_wrong')}
      </Text>
      {message && (
        <Text
          as="p"
          className="mt-2 text-center"
        >
          {t(message)}
        </Text>
      )}
      <Button
        className="mt-6"
        onClick={handleGoBack}
      >
        {t('go_back_home')}
      </Button>
    </PageContainer>
  );
};
