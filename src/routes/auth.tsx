import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

import PublicRoute from '@/components/Route/PublicRoute';

const Auth: React.FC = () => {
  return (
    <PublicRoute>
      <Outlet />
    </PublicRoute>
  );
};

export const Route = createFileRoute('/auth')({
  component: Auth,
  notFoundComponent: () => <Navigate to="/auth/login" />,
});
