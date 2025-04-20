import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

import PrivateRoute from '@/components/Route/PrivateRoute';

const Account: React.FC = () => {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
};

export const Route = createFileRoute('/account')({
  component: Account,
  notFoundComponent: () => <Navigate to="/" />,
});
