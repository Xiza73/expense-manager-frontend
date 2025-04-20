import { useMutationState as useRQMutationState } from '@tanstack/react-query';

interface UseMutationStateProps {
  mutationKey: string[];
}

export const useMutationState = <T>({
  mutationKey,
}: UseMutationStateProps): T | undefined => {
  const data = useRQMutationState({
    filters: { mutationKey },
    select: (mutation) => mutation.state.data as T | undefined,
  });

  const resolvedData = data[data.length - 1];

  return resolvedData;
};
