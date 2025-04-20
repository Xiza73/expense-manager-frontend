import { api } from '@/lib/axios';

import { GetUserResponse } from '../domain/responses/get-user.response';

const MODULE = '/auth';

export const signIn = async (token: string) => {
  const { data } = await api.post<GetUserResponse>(`${MODULE}/sign-in`, {
    token,
  });

  return data;
};
