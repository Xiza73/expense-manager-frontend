import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/transaction/')({
  component: () => <Navigate to="/" />,
});
