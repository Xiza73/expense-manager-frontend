import { useNavigate } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

export interface GoToTransactionButtonProps {
  accountId: string;
  redirect?: 'main' | 'custom';
}

export const GoToTransactionButton: React.FC<GoToTransactionButtonProps> = ({
  accountId,
  redirect,
}) => {
  const navigate = useNavigate();

  const handleGoToTransaction = () => {
    navigate({
      to: '/transaction/create/$accountId',
      params: {
        accountId,
      },
      replace: true,
      search: {
        ...(redirect === 'main' && { redirect }),
      },
    });
  };

  return (
    <Button
      className="ml-auto"
      onClick={handleGoToTransaction}
    >
      <Plus className="w-5 h-5" />
    </Button>
  );
};
