export enum GroupStatus {
  ENDED = 'ended',
  INVITED = 'invited',
  ONGOING = 'ongoing',
}

export interface ManitoGroup {
  id: any;
  name: string;
  startDate: Date;
  endDate: Date;
  maxMemberCount: number;
  status: GroupStatus;
}
