import { useNavigate } from '@tanstack/react-router';

import { AppRoute } from '@/domain/app-route.type';
import { cn } from '@/lib/utils';

export interface CardProps {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  to: AppRoute;
}

// a card that contains an icon and a title, rounded and with a shadow
// on hover, the card grows slightly and the shadow increases
// all with tailwindcss

export const Card: React.FC<CardProps> = ({ title, Icon, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to });
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        'w-64 h-64 p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
        'rounded-lg shadow-md shadow-gray-300 dark:shadow-gray-700',
        'hover:shadow-lg hover:scale-105',
        'transition-shadow duration-300 ease-in-out',
        'transition-transform',
        'cursor-pointer',
      )}
      onClick={handleClick}
    >
      {Icon && (
        <div className="w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h2 className="text-center text-xl font-bold">{title}</h2>
    </div>
  );
};
