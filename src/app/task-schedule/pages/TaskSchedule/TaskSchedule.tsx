import {
  Calendar,
  CalendarDateInfo,
  CalendarHeader,
  CalendarTable,
  CalendarTodayButton,
  CalendarTypeSelector,
} from '@/app/dnd-calendar/components/Calendar/Calendar';
import { Hour } from '@/app/dnd-calendar/constants/hour.constant';
import PageContainer from '@/components/PageContainer';

import { Task } from '../../domain/task.interface';

export const TaskSchedule: React.FC = () => {
  const tasks: Task[] = [
    {
      dayId: '12-06-2025',
      hourId: Hour['08:00'],
      duration: 1,
      userId: '1',
      name: 'Task 1',
      description: 'Task 1 description',
    },
    {
      dayId: '12-06-2025',
      hourId: Hour['09:00'],
      duration: 1,
      userId: '1',
      name: 'Task 2',
      description: 'Task 2 description',
    },
    {
      dayId: '12-06-2025',
      hourId: Hour['10:00'],
      duration: 2,
      userId: '1',
      name: 'Task 3',
      description: 'Task 3 description',
    },
    {
      dayId: '12-06-2025',
      hourId: Hour['10:00'],
      duration: 1,
      userId: '1',
      name: 'Task with long long long long long long name',
      description: 'Task 3 description',
    },
    {
      dayId: '12-06-2025',
      hourId: Hour['10:30'],
      duration: 1,
      userId: '1',
      name: 'Task crossing',
      description: 'Task 3 description',
    },
  ];

  return (
    <PageContainer>
      {/* TODO: Tasks on mobile */}
      {/* TODO: Tasks on desktop */}
      {/* TODO: Schedule responsiveness */}
      <Calendar>
        <CalendarHeader>
          <CalendarTodayButton />
          <CalendarTypeSelector className="order-1 md:order-2" />
          <CalendarDateInfo className="order-2 md:order-1" />
        </CalendarHeader>
        <CalendarTable
          data={tasks}
          startsOnMonday
          startTime={Hour['08:00']}
          endTime={Hour['23:30']}
        />
      </Calendar>
    </PageContainer>
  );
};
