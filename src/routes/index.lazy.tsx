import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

import Main from '@/app/main/pages/Main';
import PrivateRoute from '@/components/Route/PrivateRoute';

export const Index: React.FC = () => {
  return (
    <PrivateRoute>
      <Main />
    </PrivateRoute>
  );
};

export const Route = createLazyFileRoute('/')({
  component: Index,
  notFoundComponent: () => <Navigate to="/" />,
});
