import { ResponseData } from '../api.interface';

export type NullApiResponse = ResponseData<null>;

export type NullResponse = {
  message: string;
  success: boolean;
};
