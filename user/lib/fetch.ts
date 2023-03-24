import { getAccessTokenAnyway } from '@/auth/lib/jwt';
import { User } from '../model/user';

export const fetchUserInfo = async (accessToken?: any) => {
  const at = accessToken ?? (await getAccessTokenAnyway());

  const user = await createDummyUser();
  return user;
};

const createDummyUser = () => {
  return new Promise<User>((resolve) => {
    resolve({
      id: '123',
    });
  });
};
