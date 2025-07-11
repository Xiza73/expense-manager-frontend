import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

export interface ShowHideEyeProps {
  text?: string;
}

export const ShowHideEye: React.FC<ShowHideEyeProps> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  const Component = isVisible ? Eye : EyeOff;

  return (
    <div className="flex items-center justify-between w-full h-full">
      {isVisible && (
        <span className="text-muted-foreground text-sm">{text}</span>
      )}
      <Component
        className={cn('w-5 h-5 cursor-pointer', !isVisible && 'ml-auto')}
        onClick={() => setIsVisible(!isVisible)}
      />
    </div>
  );
};
