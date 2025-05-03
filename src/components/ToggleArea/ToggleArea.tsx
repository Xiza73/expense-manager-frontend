import { ChildrenProps } from '@/domain/children-props.interface';
import { cn } from '@/lib/utils';

export interface ToggleAreaProps extends ChildrenProps {
  isActive?: boolean;
  onClick?: () => void;
}

export const ToggleArea: React.FC<ToggleAreaProps> = ({
  children,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'cursor-pointer pr-2 pl-2 py-2 text-left',
        'inline-flex items-center justify-left whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'hover:bg-accent hover:text-accent-foreground',
        'h-auto w-full',
        isActive && 'bg-accent text-accent-foreground pr-1 justify-between',
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
