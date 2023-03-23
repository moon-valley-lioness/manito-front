import { getAccessTokenAnyway } from '@/auth/lib/jwt';
import { User } from '../model/user';

export const fetchUserInfo = async (accessToken?: string) => {
  const at = accessToken ?? (await getAccessTokenAnyway());

  // else throw error
  return new Promise<User>((resolve) => {
    resolve({
      id: '123',
      name: '김현진',
    });
  });
};
