import {
  axiosInstance,
  getWithToken,
  postWithToken,
  putWithToken,
} from '@/common/lib/axios-instance';
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

export const startGroup = async ({ groupId }: { groupId: number }) => {
  const { status } = await putWithToken('/groups/start', {
    groupId,
  });

  if (status === 200) {
    return true;
  } else {
    throw Error('fail to start manito group');
  }
};

export const getChatOpponent = async ({ groupId }: { groupId: number }) => {
  const { data } = await getWithToken('/users/chat-targets', {
    params: { groupId },
  });

  return data as { manitoId: number; maniteeId: number };
};
