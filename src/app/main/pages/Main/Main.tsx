import { useNavigate } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

import { useGetLatestAccountQuery } from '@/app/account/queries/account.query';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { AppRoute } from '@/domain/app-route.type';

import MainContent from '../../components/MainContent';
import MainInfoHeader from '../../components/MainInfoHeader';

export const Main: React.FC = () => {
  const { data: account } = useGetLatestAccountQuery();

  const navigate = useNavigate();

  const handleGoToTransaction = () => {
    navigate({ to: `/transaction/create/${account?.id}` as AppRoute });
  };

  if (!account) return null;

  return (
    <PageContainer>
      <MainInfoHeader account={account} />
      <Button
        className="mt-6 ml-auto"
        onClick={handleGoToTransaction}
      >
        <Plus className="w-5 h-5" />
      </Button>
      <MainContent />
    </PageContainer>
  );
};
