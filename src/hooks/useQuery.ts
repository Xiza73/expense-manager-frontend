import {
  QueryFunction,
  QueryKey,
  useQuery as useRQQuery,
} from '@tanstack/react-query';
import { useEffect } from 'react';

import { QueryParams } from '@/domain/api.interface';
import { useError } from '@/store/error/useError';
import { useLoader } from '@/store/loader/useLoader';
import { getAxiosError } from '@/utils/get-axios-error.util';

interface UseQueryProps<T> {
  queryKey: QueryKey;
  queryFn: QueryFunction<T>;
}

export const useQuery = <T, K = object>({
  queryKey,
  queryFn,
  enabled = true,
  showLoading,
  showSuccess,
  showError,
  showPageError,
}: UseQueryProps<T> & Partial<QueryParams<K>>) => {
  const { setIsFetching } = useLoader();
  const { setError } = useError();

  const { data, error, isFetching, isLoading, refetch } = useRQQuery<T>({
    queryKey,
    queryFn,
    enabled,
  });

  useEffect(() => {
    if (error && showError) {
      // pushError(getId(), 'something went wrong');
    }

    if (error && showPageError) {
      setError(
        getAxiosError(error) || 'There was an error processing your request.',
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (data && showSuccess) {
      // pushSuccess(getId(), 'success');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (showLoading) {
      setIsFetching(isLoading || isFetching);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching]);

  return { data, error, isFetching, isLoading, refetch };
};
