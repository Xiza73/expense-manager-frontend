import { ResponseData } from '../../../../domain/api.interface';
import { Account, ApiAccount } from '../account.interface';

export type GetAccountApiResponse = ResponseData<ApiAccount>;

export type GetAccountResponse = Account;
