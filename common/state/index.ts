import { GroupStatus } from '@/manito_group/model'
import { atom } from 'jotai'

export type GroupTabStatus = GroupStatus | 'INVITED'
export const groupTab = atom<GroupTabStatus>(GroupStatus.ONGOING)
