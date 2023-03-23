import { getRefreshToken } from '@/auth/lib/cookie';
import JWT from '../model/jwt';

export const fetchAuthToken = async ({ id, pwd }: { id: string; pwd: string }) => {
  return createDummyToken();
};

export const refetchAuthToken = async (refreshToken?: string) => {
  const rt = refreshToken ?? getRefreshToken();

  return createDummyToken();
};

const createDummyToken = () => {
  const accessExpriedDate = new Date();
  accessExpriedDate.setMinutes(accessExpriedDate.getMinutes() + 30);

  const refreshExpiredDate = new Date();
  refreshExpiredDate.setDate(refreshExpiredDate.getDate() + 7);

  return new Promise<JWT>((resolve) => {
    resolve({
      accessToken: '123123',
      accessExpriedDate,
      refreshToken: '123123',
      refreshExpiredDate,
    });
  });
};
