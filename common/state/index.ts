import { GroupStatus } from '@/manito_group/model';
import { atom } from 'jotai';

export const groupTab = atom(GroupStatus.ONGOING);
