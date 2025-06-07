import { createFileRoute, Navigate } from '@tanstack/react-router';

import TaskSchedule from '@/app/task-schedule/pages/TaskSchedule';

import PrivateRoute from '../components/Route/PrivateRoute';

export const RouteComponent: React.FC = () => {
  return (
    <PrivateRoute>
      <TaskSchedule />
    </PrivateRoute>
  );
};

export const Route = createFileRoute('/task-scheduler')({
  component: RouteComponent,
  notFoundComponent: () => <Navigate to="/task-scheduler" />,
});
