export enum GroupStatus {
  WAITING = 'WAITING',
  ONGOING = 'ONGOING',
  ENDED = 'ENDED',
}

export enum InviteStatus {
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
  PENDING = 'PENDING',
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
  ownerName: string;
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
  ownerName: string;
}

export interface Chat {
  id: number;
  sendUserId: number;
  message: string;
  createdAt: Date;
}
