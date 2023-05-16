import { DeserializedManitoGroup, SerializedManitoGroup } from '../model';

const deserializeManitoGroup = (group: SerializedManitoGroup): DeserializedManitoGroup => {
  return {
    ...group,
    maxMemberCount: group.maxMember,
    startDate: new Date(group.startDate),
    endDate: new Date(group.expiredDate),
  };
};

export default deserializeManitoGroup;
