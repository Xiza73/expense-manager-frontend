import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import EditService from '@/app/service/pages/EditService';

const serviceIdSearchSchema = z.object({
  name: z.string().min(1),
});

export const Route = createFileRoute('/service/edit/$serviceId')({
  validateSearch: serviceIdSearchSchema,
  component: EditService,
});
