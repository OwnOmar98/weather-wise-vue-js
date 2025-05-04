import type { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';

export const setHeaders = (config: InternalAxiosRequestConfig) => {
  config = config ?? {};
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }

  /*
   * add the access token to the request
   */
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
};
