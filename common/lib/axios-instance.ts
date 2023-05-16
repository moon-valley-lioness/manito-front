import axios, { AxiosRequestConfig } from 'axios';
import { SERVER_URL } from '../constants/url';
import { getAccessTokenAnyway } from '@/auth/lib/jwt';

export const axiosInstance = axios.create({ baseURL: SERVER_URL });

export async function getWithToken(url: string, config?: AxiosRequestConfig) {
  const token = await getAccessTokenAnyway();
  return axiosInstance.get(url, {
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function postWithToken(url: string, data?: any, config?: AxiosRequestConfig<any>) {
  const token = await getAccessTokenAnyway();
  return axiosInstance.post(url, data, {
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
