import { DndContext, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  Calendar,
  CalendarDateInfo,
  CalendarHeader,
  CalendarTable,
  CalendarTodayButton,
  // CalendarTypeSelector,
} from '@/app/dnd-calendar/components/Calendar/Calendar';
import { CalendarDayCard } from '@/app/dnd-calendar/components/CalendarCard/CalendarCard';
import CalendarTask from '@/app/dnd-calendar/components/CalendarTask';
import { CalendarTaskCard } from '@/app/dnd-calendar/components/CalendarTask/CalendarTask';
import { Hour } from '@/app/dnd-calendar/constants/hour.constant';
import PageContainer from '@/components/PageContainer';

import { Task } from '../../domain/task.interface';

const mockTasks: Task[] = [
  {
    id: '1',
    dayId: '19-06-2025',
    hourId: Hour['08:00'],
    duration: 1,
    userId: '1',
    name: 'Task 1',
    description: 'Task 1 description',
  },
  {
    id: '2',
    dayId: '19-06-2025',
    hourId: Hour['09:00'],
    duration: 1,
    userId: '1',
    name: 'Task 2',
    description: 'Task 2 description',
  },
  {
    id: '3',
    dayId: '19-06-2025',
    hourId: Hour['10:00'],
    duration: 2,
    userId: '1',
    name: 'Task 3',
    description: 'Task 3 description',
  },
  {
    id: '4',
    dayId: '19-06-2025',
    hourId: Hour['10:00'],
    duration: 1,
    userId: '1',
    name: 'Task with long long long long long long name',
    description: 'Task 3 description',
  },
  {
    id: '5',
    dayId: '19-06-2025',
    hourId: Hour['10:30'],
    duration: 1,
    userId: '1',
    name: 'Task crossing',
    description: 'Task 3 description',
  },
];

export const TaskSchedule: React.FC = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (task: Task) => {
    setTasks(tasks.filter((el) => el.id !== task.id));
  };

  const handleUpdateTask = (task: Task) => {
    setTasks(tasks.map((el) => (el.id === task.id ? task : el)));
  };

  const onDragStart = useCallback((elem: DragStartEvent) => {
    if (elem.active.data.current?.type === 'calendar-item') {
      setActiveTask(elem.active.data.current.item);

      return;
    }
  }, []);

  return (
    <DndContext onDragStart={onDragStart}>
      <PageContainer className="">
        {/* TODO: Tasks on mobile */}
        {/* TODO: Tasks on desktop */}
        <CalendarHeader>
          <CalendarDateInfo />
          <CalendarTodayButton />
          {/* <CalendarDateInfo className="order-2 md:order-1" /> */}
          {/* <CalendarTypeSelector className="order-1 md:order-2" /> */}
        </CalendarHeader>
        <Calendar>
          <CalendarTask>
            <CalendarTaskCard
              name="Task 1"
              startTime="08:00"
              hourHandler={Hour}
              duration={1}
            />
          </CalendarTask>
          {/* TODO: Schedule responsiveness */}
          <CalendarTable
            data={tasks}
            startsOnMonday
            startTime={Hour['08:00']}
            endTime={Hour['23:30']}
            onAddItem={handleAddTask}
            onDeleteItem={handleDeleteTask}
            onUpdateItem={handleUpdateTask}
          />
        </Calendar>
      </PageContainer>
      {createPortal(
        <DragOverlay>
          {activeTask && (
            <CalendarDayCard
              item={activeTask}
              hourHandler={Hour}
              left={0}
            />
          )}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
