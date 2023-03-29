export enum GroupStatus {
  ENDED = 'ended',
  INVITED = 'invited',
  ONGOING = 'ongoing',
}

export interface SerializedManitoGroup {
  id: any;
  name: string;
  startDate: string;
  endDate: string;
  maxMemberCount: number;
  status: GroupStatus;
}

export interface DeserializedManitoGroup {
  id: any;
  name: string;
  startDate: Date;
  endDate: Date;
  maxMemberCount: number;
  status: GroupStatus;
}
