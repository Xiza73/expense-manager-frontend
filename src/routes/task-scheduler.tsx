import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

import { CalendarProvider } from '@/app/dnd-calendar/context/calendar/CalendarProvider';
import { CalendarType } from '@/app/dnd-calendar/domain/calendar-type.enum';

import PrivateRoute from '../components/Route/PrivateRoute';

export const RouteComponent: React.FC = () => {
  return (
    <CalendarProvider defaultCalendarType={CalendarType.DAY}>
      <PrivateRoute>
        <Outlet />
      </PrivateRoute>
    </CalendarProvider>
  );
};

export const Route = createFileRoute('/task-scheduler')({
  component: RouteComponent,
  notFoundComponent: () => <Navigate to="/task-scheduler" />,
});
