import { createFileRoute, Navigate } from '@tanstack/react-router';

import Home from '@/app/home/pages/Home';
import PrivateRoute from '@/components/Route/PrivateRoute';

export const Index: React.FC = () => {
  return (
    <PrivateRoute>
      <Home />
    </PrivateRoute>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
  notFoundComponent: () => <Navigate to="/" />,
});
