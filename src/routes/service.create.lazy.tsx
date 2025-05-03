import { createLazyFileRoute } from '@tanstack/react-router';

import CreateService from '@/app/service/pages/CreateService';

export const Route = createLazyFileRoute('/service/create')({
  component: CreateService,
});
