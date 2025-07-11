/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormHandleSubmit } from 'react-hook-form';

import { ChildrenProps } from '@/domain/children-props.interface';

import FormButton from '../FormButton';
import { Text } from '../ui/text';

export interface FormContainerProps extends ChildrenProps {
  onSubmit: (data: any) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<any>;
  title: string;
  description?: string;
  buttonText: string;
  withoutButtonBackground?: boolean;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  onSubmit,
  handleSubmit,
  title,
  description,
  buttonText,
  withoutButtonBackground = false,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
        <Text
          as="h1"
          className="text-center"
        >
          {title}
        </Text>
        {description && (
          <Text
            as="p"
            className="text-center"
          >
            {description}
          </Text>
        )}
        {children}
      </div>
      <FormButton withoutBackground={withoutButtonBackground}>
        {buttonText}
      </FormButton>
    </form>
  );
};
