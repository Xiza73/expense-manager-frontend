import { Resizable, ResizeCallback, Size } from 're-resizable';
import { useCallback, useState } from 'react';

import { cn } from '@/lib/utils';
import { truncate } from '@/utils/truncate.util';

import { PartialData } from '../../domain/calendar-day.interface';
import {
  calcHeight,
  calcWidth,
  ceilHeight,
} from '../../utils/calc-height.util';
import { getEndTime } from '../../utils/get-end-time.util';

export interface CalendarCardProps {
  name: string;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  );
};

interface CalendarDayCardProps<T extends PartialData>
  extends React.ComponentProps<'div'> {
  item: T;
  duration: number;
  prevDuration: number;
  left: number;
  startTime: string;
  name: string;
  hourHandler: Record<string, string>;
  onUpdateItem?: (item: T) => void;
}

export const CalendarDayCard = <T extends PartialData>({
  item,
  name,
  duration,
  prevDuration,
  left,
  startTime,
  hourHandler,
  onUpdateItem,
}: CalendarDayCardProps<T>) => {
  const width = calcWidth(duration);
  const height = calcHeight(duration);

  const defaultSize = {
    width,
    height,
  };

  const [size, setSize] = useState<Size>(defaultSize);
  const [dragStartSize, setDragStartSize] = useState<Size | null>(null);

  const { value } = truncate(name, 20);

  const onResize: ResizeCallback = useCallback(
    (_e, direction, _elementRef, delta) => {
      setSize((prevSize) => {
        // elementRef.innerText = 8:00 -
        if (!dragStartSize) return prevSize;

        if (
          [
            'right',
            'left',
            'topRight',
            'bottomRight',
            'bottomLeft',
            'topLeft',
            'top',
          ].includes(direction)
        )
          return prevSize;

        const newHeight =
          parseFloat(`${dragStartSize.height || height}`) + delta.height;

        const { duration, height: newHeightCeil } = ceilHeight(newHeight);
        const newWidth = calcWidth(duration);

        return { ...prevSize, height: newHeightCeil, width: newWidth };
      });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dragStartSize],
  );

  return (
    <Resizable
      className={cn(
        'p-1',
        'overflow-hidden truncate',
        'absolute top-1 left-1 z-10',
        'flex flex-col justify-center items-start',
        'text-sm',
        'border border-gray-300 dark:border-gray-800 rounded',
        'bg-gray-200 dark:bg-gray-700',
        'text-gray-800 dark:text-gray-200',
      )}
      style={{
        position: 'absolute',
        left: `${left * 8 + (left + 1) * 0.3 + (prevDuration - 1) * 4}rem`,
        width,
        height,
      }}
      minWidth={128}
      minHeight={54.4}
      defaultSize={defaultSize}
      size={size}
      onResizeStart={() => {
        setDragStartSize(size);
      }}
      onResize={onResize}
      onResizeStop={(_e, _direction, _ref, _delta) => {
        const { duration } = ceilHeight(size.height as number);

        onUpdateItem?.({
          ...item,
          duration,
        });

        setDragStartSize(null);
      }}
    >
      <p>
        {startTime} - {getEndTime(hourHandler, startTime, duration)}
      </p>
      <p className="flex-1">{value}</p>
    </Resizable>
  );
};
