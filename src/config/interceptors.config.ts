import {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { User } from '@/domain/user.interface';
import { getItem } from '@/utils/local-storage.util';

export interface ConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  try {
    const token = getItem<User>('userLogged')?.token;

    if (token) config.headers.set('Authorization', `Bearer ${token}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  if (error.response?.status === 401) {
    await Promise.reject(error);
  } else {
    if (error.response) {
      const errorMessage: ConsoleError = {
        status: error.response.status,
        data: error.response.data,
      };
      // eslint-disable-next-line no-console
      console.error(errorMessage);
    } else if (error.request) {
      // eslint-disable-next-line no-console
      console.error(error.request);
    } else {
      // eslint-disable-next-line no-console
      console.error('Error', error.message);
    }
    await Promise.reject(error);
  }
};
