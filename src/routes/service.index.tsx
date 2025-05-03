import { createFileRoute } from '@tanstack/react-router';

import ServicesTable from '@/app/service/pages/ServicesTable';

export const Route = createFileRoute('/service/')({
  component: ServicesTable,
});
