import { GroupStatus } from '@/manito_group/model';
import { atom } from 'jotai';

export const groupTab = atom(GroupStatus.ONGOING);
export const inviteModal = atom<{
  groupId: number | undefined;
  open: boolean;
}>({
  groupId: undefined,
  open: false,
});
