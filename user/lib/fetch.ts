import { ACCESS_TOKEN_KEY } from '@/auth/constant/token_key';
import { getCookie } from 'cookies-next';
import { User } from '../model/user';

export const fetchUserInfo = async (accessToken?: any) => {
  if (accessToken) {
    // use accessToken from param
  }

  const accessTokenFromCookie = getCookie(ACCESS_TOKEN_KEY);
  if (accessTokenFromCookie) {
    // use accessToken from cookie
  }

  // else throw error
  return new Promise<User>((resolve) => {
    resolve({
      id: '123',
      name: '김현진',
    });
  });
};
