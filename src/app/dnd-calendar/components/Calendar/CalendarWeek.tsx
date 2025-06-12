export interface CalendarWeekProps {
  name: string;
}

export const CalendarWeek: React.FC<CalendarWeekProps> = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  );
};
