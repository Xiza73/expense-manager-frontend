import { createFileRoute } from '@tanstack/react-router';

import AccountsTable from '@/app/account/pages/AccountsTable';

export const Route = createFileRoute('/account/')({
  component: AccountsTable,
});
