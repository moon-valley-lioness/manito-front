import { getAccessTokenAnyway } from '@/auth/lib/jwt';
import { User } from '../model/user';
import { axiosInstance } from '@/common/lib/axios-instance';

export const fetchUserInfo = async (accessToken?: any) => {
  const at = accessToken ?? (await getAccessTokenAnyway());

  const user = await createDummyUser();
  return user;
};

enum CreateUserStatus {
  SUCCESS = 200,
  DUPLICATED = 406,
}
export const createUser = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}): Promise<{
  isSuccess: boolean;
  errMsg?: string;
}> => {
  const { status } = await axiosInstance.post('/users', {
    id,
    password,
  });

  if (status === CreateUserStatus.SUCCESS) {
    return {
      isSuccess: true,
    };
  } else if (status === CreateUserStatus.DUPLICATED) {
    return {
      isSuccess: false,
      errMsg: '이미 존재하는 아이디입니다.',
    };
  } else {
    return {
      isSuccess: false,
      errMsg: '회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.',
    };
  }
};

const createDummyUser = () => {
  return new Promise<User>((resolve) => {
    resolve({
      id: '123',
    });
  });
};
