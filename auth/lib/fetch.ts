import { getRefreshToken } from '@/auth/lib/cookie';
import JWT from '../model/jwt';
import { axiosInstance } from '@/common/lib/axios-instance';

export const fetchAuthToken = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}): Promise<JWT | null> => {
  try {
    const { status, data } = await axiosInstance.post('/users/login', {
      id,
      password,
    });
    if (status === 200) {
      return {
        accessToken: data.accessToken,
        accessExpriedDate: new Date(data.accessExpiredDate),
        refreshToken: data.refreshToken,
        refreshExpiredDate: new Date(data.refreshExpiredDate),
      };
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const refetchAuthToken = async (refreshToken?: string): Promise<JWT | null> => {
  const rt = refreshToken ?? getRefreshToken();
  const { status, data } = await axiosInstance.post('/auth/refresh', undefined, {
    headers: {
      Authorization: `Bearer ${rt}`,
    },
  });
  if (status === 200) {
    return {
      accessToken: data.accessToken,
      accessExpriedDate: new Date(data.accessExpiredDate),
      refreshToken: data.refreshToken,
      refreshExpiredDate: new Date(data.refreshExpiredDate),
    };
  }
  return null;
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
