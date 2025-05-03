import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { useEffect } from 'react';

import { useError } from '@/store/error/useError';
import { useLoader } from '@/store/loader/useLoader';
import { getAxiosError } from '@/utils/get-axios-error.util';

import { QueryParams } from '../domain/api.interface';

interface QueryOptionsProps<T> {
  queryOptions: UseSuspenseQueryOptions<T>;
}

export const useQueryOptions = <T, K = object>({
  queryOptions,
  showLoading,
  showSuccess,
  showError,
  showPageError,
}: QueryOptionsProps<T> & Partial<QueryParams<K>>) => {
  const { setIsFetching } = useLoader();
  const { setError } = useError();

  const { data, error, isFetching, isLoading, refetch } =
    useSuspenseQuery(queryOptions);

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
