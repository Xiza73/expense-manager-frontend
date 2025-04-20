import PageContainer from '@/components/PageContainer';

import MainContent from '../../components/MainContent';
import MainInfoHeader from '../../components/MainInfoHeader';

export const Main: React.FC = () => {
  return (
    <PageContainer>
      <MainInfoHeader />
      <MainContent />
    </PageContainer>
  );
};
