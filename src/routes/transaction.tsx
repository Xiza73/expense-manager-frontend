import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

import PrivateRoute from '@/components/Route/PrivateRoute';

export const Transaction: React.FC = () => {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
};

export const Route = createFileRoute('/transaction')({
  component: Transaction,
  notFoundComponent: () => <Navigate to="/" />,
});
