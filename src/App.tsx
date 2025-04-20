import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import Loader from './components/Loader';
import Modal from './components/Modal';
import { routeTree } from './routeTree.gen';

export const AppRouter = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof AppRouter;
  }
}

export const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={AppRouter} />
      <Loader />
      <Modal />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};
