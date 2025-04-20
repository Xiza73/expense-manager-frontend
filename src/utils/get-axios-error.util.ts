import { AxiosError } from 'axios';

export const getAxiosError = (error: unknown) => {
  return (error as AxiosError<{ message: string }>)?.response?.data?.message;
};
