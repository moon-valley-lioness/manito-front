import { getAccessTokenAnyway } from '@/auth/lib/jwt';
import { ManitoGroup } from '@/manito_group/model/manito_group';

export const fetchGroupList = async (accessToken?: any) => {
  const at = accessToken ?? (await getAccessTokenAnyway());

  const groups = await createDummyGroups();
  return groups;
};

const createDummyGroups = async () => {
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
