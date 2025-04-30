import { QueryBody } from '@/domain/api.interface';
import { useMutation } from '@/hooks/useMutation';

import { SignInRequest } from '../domain/requests/sign-in.request';
import { GetUserResponse } from '../domain/responses/get-user.response';
import { signIn } from '../services/auth.service';

export const useSignInMutation = (query?: QueryBody<SignInRequest>) =>
  useMutation<GetUserResponse, SignInRequest>({
    ...query,
    showError: true,
    mutationFn: async (body) => {
      const data = await signIn(body.token);

      return {
        ...data,
        responseObject: {
          token: '',
          alias: data.responseObject.alias,
          isActive: true,
        },
      };
    },
  });
