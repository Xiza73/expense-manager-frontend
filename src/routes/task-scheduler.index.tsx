import { createFileRoute } from '@tanstack/react-router';

import TaskSchedule from '@/app/task-schedule/pages/TaskSchedule';

export const Route = createFileRoute('/task-scheduler/')({
  component: TaskSchedule,
});
