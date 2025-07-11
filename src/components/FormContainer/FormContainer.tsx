/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormHandleSubmit } from 'react-hook-form';

import { ChildrenProps } from '@/domain/children-props.interface';
import { cn } from '@/lib/utils';

import FormButton from '../FormButton';
import { Text } from '../ui/text';

export interface FormContainerProps extends ChildrenProps {
  onSubmit: (data: any) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<any>;
  title: string;
  description?: string;
  buttonText: string;
  withoutButtonBackground?: boolean;
  cancelText?: string;
  cancelAction?: () => void;
  isModal?: boolean;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  onSubmit,
  handleSubmit,
  title,
  description,
  buttonText,
  withoutButtonBackground = false,
  cancelText,
  cancelAction,
  isModal = false,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={cn(
          'flex flex-col items-center justify-center w-full h-full',
          isModal ? 'p-0' : 'p-4',
          !isModal && 'space-y-4',
        )}
      >
        {isModal ? (
          <>
            <Text
              as="h2"
              className="py-2 w-full sm:px-12 md:px-16 border-b border-gray-200 text-center"
            >
              {title}
            </Text>
            {description && (
              <Text
                as="p"
                className="p-5"
              >
                {description}
              </Text>
            )}
          </>
        ) : (
          <>
            {title && (
              <Text
                as="h1"
                className="text-center"
              >
                {title}
              </Text>
            )}
            {description && (
              <Text
                as="p"
                className="text-center"
              >
                {description}
              </Text>
            )}
          </>
        )}
        {children}
      </div>
      <FormButton
        withoutBackground={withoutButtonBackground}
        cancelText={cancelText}
        cancelAction={cancelAction}
      >
        {buttonText}
      </FormButton>
    </form>
  );
};
