import { HourKey } from '../constants/hour.constant';

export interface PartialData {
  dayId: string;
  hourId: HourKey;
  duration: number;
  name: string;
}

export interface CalendarDay<T extends PartialData> {
  id: string;
  date?: Date;
  data: T[];
}
