import { createLazyFileRoute } from '@tanstack/react-router';

import CreateAccount from '@/app/account/pages/CreateAccount';

export const Route = createLazyFileRoute('/account/create')({
  component: CreateAccount,
});
