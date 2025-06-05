import { cn } from '@/lib/utils';
import { truncate } from '@/utils/truncate.util';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export interface TruncateTooltipTextProps {
  text: string;
  maxLength?: number;
  lineThrough?: boolean;
}

export const TruncateTooltipText: React.FC<TruncateTooltipTextProps> = ({
  text,
  maxLength = 20,
  lineThrough = false,
}) => {
  const { isTruncated, value } = truncate(text, maxLength);

  if (!text) return null;

  if (isTruncated) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={cn(lineThrough && 'text-paid')}>
            {value}
          </TooltipTrigger>
          <TooltipContent>{text}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <div className={cn(lineThrough && 'text-paid')}>{text}</div>;
};
