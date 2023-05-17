export enum GroupStatus {
  WAITING = 'WAITING',
  ONGOING = 'ONGOING',
  ENDED = 'ENDED',
}

export interface SerializedManitoGroup {
  id: any;
  name: string;
  startDate: string;
  expiredDate: string;
  maxMember: number;
  status: GroupStatus;
}

export interface DeserializedManitoGroup {
  id: any;
  name: string;
  startDate: Date;
  endDate: Date;
  maxMemberCount: number;
  status: GroupStatus;
  isOwner?: boolean;
}
