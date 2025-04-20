import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { env } from '@/config/env.config';
import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from '@/config/interceptors.config';

const apiUrl = env.API_URL;

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: apiUrl,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
