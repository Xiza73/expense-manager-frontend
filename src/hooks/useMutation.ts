import {
  MutationFunction,
  useMutation as useRQMutation,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { AnyFunction } from '@/domain/any-function.type';
import { QueryBody } from '@/domain/api.interface';
import { useLoader } from '@/store/loader/useLoader';
import { getAxiosError } from '@/utils/get-axios-error.util';
import { noopFunction } from '@/utils/noop-function.util';

interface UseMutationProps<T, K> {
  mutationFn: MutationFunction<T, K>;
  onSuccess?: AnyFunction;
  onError?: AnyFunction;
  onSettled?: AnyFunction;
  showSuccess?: boolean;
  showError?: boolean;
  customSuccessMessage?: string;
  customErrorMessage?: string;
  mutationKey?: string[];
}

export const useMutation = <T extends { message: string }, K = object>({
  mutationFn,
  onSuccess = noopFunction,
  onError = noopFunction,
  onSettled = noopFunction,
  showSuccess,
  showError,
  customSuccessMessage,
  customErrorMessage,
  mutationKey,
}: UseMutationProps<T, K> & Partial<QueryBody<K>>) => {
  const { pushLoader, popLoader } = useLoader();

  return useRQMutation({
    ...(mutationKey && { mutationKey }),
    mutationFn,
    onMutate: () => {
      pushLoader();
    },
    onSuccess: (data: T) => {
      if (showSuccess)
        toast.success(customSuccessMessage || data.message || '¡Success!');

      onSuccess();
    },
    onError: (err: unknown) => {
      if (showError)
        toast.error(
          customErrorMessage ||
            getAxiosError(err) ||
            'There was an error processing your request.',
        );

      onError();

      return err;
    },
    onSettled: () => {
      onSettled();

      popLoader();
    },
  });
};
