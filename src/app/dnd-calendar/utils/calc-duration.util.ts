import { PartialData } from '../domain/calendar-day.interface';

export const calcDuration = <T extends PartialData>(data: T[]): number => {
  return data.reduce((acc, curr) => acc + curr.duration, 0);
};
