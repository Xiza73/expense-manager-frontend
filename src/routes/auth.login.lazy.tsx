import { createLazyFileRoute } from '@tanstack/react-router';

import Login from '@/app/auth/pages/Login';

export const Route = createLazyFileRoute('/auth/login')({
  component: Login,
});
