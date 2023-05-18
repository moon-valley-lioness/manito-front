import { axiosInstance, getWithToken, postWithToken } from '@/common/lib/axios-instance';
import { DeserializedManitoGroup, GroupStatus, SerializedManitoGroup } from '@/manito_group/model';
import deserializeManitoGroup from './deserializeManitoGroup';
import { AxiosResponse } from 'axios';

export const fetchGroupList = async (status: GroupStatus) => {
  const { status: axiosState, data } = await getWithToken('/groups', {
    params: {
      status,
    },
  });
  if (axiosState === 200) {
    return data.map((d: any) => deserializeManitoGroup(d)) as DeserializedManitoGroup[];
  } else {
    throw Error('그룹목록 조회 실패');
  }
};

export const fetchInvitedGroupList = async () => {
  const { status: axiosState, data } = await getWithToken('/groups/invited');
  if (axiosState === 200) {
    return data.map((d: any) => deserializeManitoGroup(d)) as DeserializedManitoGroup[];
  } else {
    throw Error('초대받은 그룹목록 조회 실패');
  }
};

export const fetchGroupDetail = async (groupId: number, accessToken?: any) => {
  let result: AxiosResponse<SerializedManitoGroup>;
  if (accessToken) {
    result = await axiosInstance.get(`/groups/${groupId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } else {
    result = await getWithToken(`/groups/${groupId}`);
  }

  return result.data;
};

export const createGroup = async (newGroup: DeserializedManitoGroup) => {
  return postWithToken('/groups', {
    name: newGroup.name,
    maxNumber: newGroup.maxMemberCount,
    startDate: newGroup.startDate,
    expiredDate: newGroup.endDate,
  });
};

export const inviteGroup = async ({ groupId, guestId }: { groupId: number; guestId: string }) => {
  return postWithToken('/groups/invite', {
    groupId,
    guestId,
  });
};

export const answerToInvite = async ({
  groupId,
  isAccept,
}: {
  groupId: number;
  isAccept: boolean;
}) => {
  return postWithToken('/groups/invite/answer', {
    groupId,
    isAccept,
  });
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
          expiredDate: new Date().toJSON(),
          maxMember: 5,
          status: GroupStatus.ENDED,
        },
        {
          id: 2,
          name: 'group02',
          startDate: new Date().toJSON(),
          expiredDate: new Date().toJSON(),
          maxMember: 5,
          status: GroupStatus.ONGOING,
        },
        {
          id: 3,
          name: 'group03',
          startDate: new Date().toJSON(),
          expiredDate: new Date().toJSON(),
          maxMember: 5,
          status: GroupStatus.WAITING,
        },
      ]);
    }, 500);
  }).then((data) => {
    return data;
  });
};
