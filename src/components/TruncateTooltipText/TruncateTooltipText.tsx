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
}

export const TruncateTooltipText: React.FC<TruncateTooltipTextProps> = ({
  text,
  maxLength = 20,
}) => {
  const { isTruncated, value } = truncate(text, maxLength);

  if (!text) return null;

  if (isTruncated) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{value}</TooltipTrigger>
          <TooltipContent>{text}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <>{text}</>;
};
