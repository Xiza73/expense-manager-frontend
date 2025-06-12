import { PartialData } from '@/app/dnd-calendar/domain/calendar-day.interface';

export interface Task extends PartialData {
  userId: string;
  description: string;
}
