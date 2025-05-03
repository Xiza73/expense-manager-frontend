import { ChildrenProps } from '@/domain/children-props.interface';
import { cn } from '@/lib/utils';

export const FormButton: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="flex justify-center w-full p-4 mt-2 bg-gray-100 dark:bg-gray-700">
      <button
        type="submit"
        className={cn(
          'px-4 py-2 rounded cursor-pointer',
          'text-white bg-blue-500 hover:bg-blue-600',
          'dark:text-white dark:bg-blue-700 dark:hover:bg-blue-800',
        )}
      >
        {children}
      </button>
    </div>
  );
};
