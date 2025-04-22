import { AnyFunction } from "./any-function.type";

export interface ResponseData<T> {
  success: boolean;
  message: string;
  responseObject: T;
  statusCode: number;
}

export interface ListData<T> {
  data: T[];
  total: number;
  pages: number;
  page: number;
}

export interface ResponseListData<T> {
  success: boolean;
  message: string;
  responseObject: ListData<T>;
  statusCode: number;
}

export interface QueryOptions {
  showSuccess?: boolean;
  showError?: boolean;
  showPageError?: boolean;
  onSuccess?: AnyFunction;
  showLoading?: boolean;
  enabled?: boolean;
  mutationKey?: string[];
}

export interface QueryParams<T = object> extends QueryOptions {
  params: T;
}

export interface QueryBody<T = object> extends QueryOptions {
  body?: T;
}
