import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/auth/constant/token_key';
import { User } from '@/user/model/user';
import { setCookie, getCookie, removeCookies } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

/**
 *
 * @param options - 서버사이드에서 사용할 경우 options에 res: ServerResponse, req: IncomingMessage 값이 필요
 * @returns user jwt token: string | boolean | undefined | null
 */
const getUserAccessToken = (options?: OptionsType | undefined) => {
  return getCookie(ACCESS_TOKEN_KEY, options);
};

/**
 *
 * @param options - 서버사이드에서 사용할 경우 options에 res: ServerResponse, req: IncomingMessage 값이 필요
 * @returns
 */
const setUserAccessToken = (token: any, options?: OptionsType | undefined) => {
  setCookie(ACCESS_TOKEN_KEY, token, options);
};

/**
 *
 * @param options - 서버사이드에서 사용할 경우 options에 res: ServerResponse, req: IncomingMessage 값이 필요
 * @returns user jwt token: string | boolean | undefined | null
 */
const getUserRefreshToken = (options?: OptionsType | undefined) => {
  return getCookie(REFRESH_TOKEN_KEY, options);
};

/**
 *
 * @param options - 서버사이드에서 사용할 경우 options에 res: ServerResponse, req: IncomingMessage 값이 필요
 * @returns
 */
const setUserRefreshToken = (token: any, options?: OptionsType | undefined) => {
  setCookie(REFRESH_TOKEN_KEY, token, options);
};

const clearUserToken = () => {
  removeCookies(ACCESS_TOKEN_KEY);
  removeCookies(REFRESH_TOKEN_KEY);
};

export {
  getUserAccessToken,
  setUserAccessToken,
  getUserRefreshToken,
  setUserRefreshToken,
  clearUserToken,
};
