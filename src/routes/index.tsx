import { createFileRoute, Navigate } from '@tanstack/react-router';
import { z } from 'zod';

import Main from '@/app/main/pages/Main';
import PrivateRoute from '@/components/Route/PrivateRoute';

export const Index: React.FC = () => {
  return (
    <PrivateRoute>
      <Main />
    </PrivateRoute>
  );
};

const accountIdSearchSchema = z.object({
  method: z.enum(['crt', 'edt']).optional(),
});

export const Route = createFileRoute('/')({
  validateSearch: accountIdSearchSchema,
  component: Index,
  notFoundComponent: () => <Navigate to="/" />,
});
