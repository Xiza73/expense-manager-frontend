import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

import PrivateRoute from '@/components/Route/PrivateRoute';

const Service: React.FC = () => {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
};

export const Route = createFileRoute('/servicet')({
  component: Service,
  notFoundComponent: () => <Navigate to="/account" />,
});
