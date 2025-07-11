import { ChildrenProps } from '@/domain/children-props.interface';
import { cn } from '@/lib/utils';

export interface FormButtonProps extends ChildrenProps {
  withoutBackground?: boolean;
  cancelText?: string;
  cancelAction?: () => void;
}

export const FormButton: React.FC<FormButtonProps> = ({
  withoutBackground = false,
  children,
  cancelText,
  cancelAction = () => {},
}) => {
  return (
    <div
      className={cn(
        'flex justify-center items-center w-full p-4 mt-2 gap-4',
        !withoutBackground && 'bg-gray-100 dark:bg-gray-700',
      )}
    >
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
      {cancelText && (
        <button
          type="button"
          className={cn(
            'px-4 py-2 rounded cursor-pointer',
            'text-white bg-red-500 hover:bg-red-600',
            'dark:text-white dark:bg-red-700 dark:hover:bg-red-800',
          )}
          onClick={cancelAction}
        >
          {cancelText}
        </button>
      )}
    </div>
  );
};
