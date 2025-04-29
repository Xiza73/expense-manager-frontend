import { useNavigate } from '@tanstack/react-router';
import { Laugh } from 'lucide-react';

import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export const FirstAccount: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToAccount = () => {
    navigate({ to: '/account/create' });
  };

  return (
    <PageContainer className="items-center justify-center">
      <Laugh className="size-24" />
      <Text
        as="h1"
        className="mt-4 text-center"
      >
        Create your first account and start tracking your expenses.
      </Text>
      <Button
        className="mt-8"
        onClick={handleGoToAccount}
      >
        Create Account
      </Button>
    </PageContainer>
  );
};
