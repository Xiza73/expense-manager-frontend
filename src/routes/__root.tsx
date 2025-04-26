import { createRootRoute, Navigate, Outlet } from '@tanstack/react-router';
import { lazy, useEffect } from 'react';

import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/store/auth/useAuth';

const TanStackRouterDevtools = !import.meta.env.DEV
  ? () => null
  : lazy(() =>
      import('@tanstack/react-router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

const AppRoute: React.FC = () => {
  const { isProcessing, handleCurrentUser } = useAuth();

  useEffect(() => {
    handleCurrentUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isProcessing) return <Loader loading />;

  return (
    <SidebarProvider
      open
      defaultOpen={false}
    >
      <Layout>
        <Outlet />
        <TanStackRouterDevtools />
      </Layout>
    </SidebarProvider>
  );
};

export const Route = createRootRoute({
  component: AppRoute,
  errorComponent: ({ error }) => {
    return <div> 404 - {error.message}</div>;
  },
  notFoundComponent: () => <Navigate to="/" />,
});
