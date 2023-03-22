import { ACCESS_TOKEN_KEY } from '@/constant/cookie';
import { ManitoGroup } from '@/types/manito_group';
import { getCookie } from 'cookies-next';

const fetchGroupList = async (accessToken?: any) => {
  if (accessToken) {
    // use accessToken from param
  }

  const accessTokenFromCookie = getCookie(ACCESS_TOKEN_KEY);
  if (accessTokenFromCookie) {
    // use accessToken from cookie
  }

  // else throw error
  return new Promise<ManitoGroup[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'group01',
        },
        {
          id: 2,
          name: 'group02',
        },
      ]);
    }, 3000);
  }).then((data) => {
    return data;
  });
};

export { fetchGroupList };
