import { ResponseData } from '@/domain/api.interface';

export type CreateAccountResponse = {
  id: string;
  message: string;
};

export type CreateAccountApiResponse = ResponseData<CreateAccountResponse>;
