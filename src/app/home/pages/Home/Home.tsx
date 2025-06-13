import { Calendar, ChartCandlestick } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import PageContainer from '@/components/PageContainer';
import { Text } from '@/components/ui/text';

import Card from '../../components/Card';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Text as="h1">{t('habit_sumaq')}</Text>
      <Text
        as="h4"
        className="mt-4 text-center text-muted-foreground italic"
      >
        "{t('start_a_good_habit')}"
      </Text>
      <div className="flex justify-around flex-wrap gap-4 mt-10">
        <Card
          title={t('expense_manager')}
          Icon={ChartCandlestick}
          to="/expense-manager"
        />
        <Card
          title={t('task_scheduler')}
          Icon={Calendar}
          to="/task-scheduler"
        />
      </div>
    </PageContainer>
  );
};
