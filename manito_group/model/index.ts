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
  currentNumber: number;
  maxNumber: number;
  status: GroupStatus;
  ownerId: any;
  isOwner: boolean;
}

export interface DeserializedManitoGroup {
  id: any;
  name: string;
  startDate: Date;
  endDate: Date;
  currentMemberCount: number;
  maxMemberCount: number;
  status: GroupStatus;
  isOwner: boolean;
}
