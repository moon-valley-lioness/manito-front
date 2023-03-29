import { getAccessTokenAnyway } from '@/auth/lib/jwt';
import { GroupStatus, SerializedManitoGroup } from '@/manito_group/model';

export const fetchGroupList = async (status: GroupStatus, accessToken?: any) => {
  const at = accessToken ?? (await getAccessTokenAnyway());

  const groups = await createDummyGroups();
  return groups.filter((g) => g.status === status);
};

export const fetchGroupDetail = async (groupId: string, accessToken?: any) => {
  const at = accessToken ?? (await getAccessTokenAnyway());

  const groups = await createDummyGroups();
  return groups.find((g) => String(g.id) === groupId);
};

const createDummyGroups = async () => {
  console.log(`called createDummyGroups`);
  return new Promise<SerializedManitoGroup[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'group01',
          startDate: new Date().toJSON(),
          endDate: new Date().toJSON(),
          maxMemberCount: 5,
          status: GroupStatus.ENDED,
        },
        {
          id: 2,
          name: 'group02',
          startDate: new Date().toJSON(),
          endDate: new Date().toJSON(),
          maxMemberCount: 5,
          status: GroupStatus.ONGOING,
        },
        {
          id: 3,
          name: 'group03',
          startDate: new Date().toJSON(),
          endDate: new Date().toJSON(),
          maxMemberCount: 5,
          status: GroupStatus.INVITED,
        },
      ]);
    }, 500);
  }).then((data) => {
    return data;
  });
};
