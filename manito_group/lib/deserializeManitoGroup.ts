import { DeserializedManitoGroup, SerializedManitoGroup } from '../model';

const deserializeManitoGroup = (group: SerializedManitoGroup): DeserializedManitoGroup => {
  return {
    id: group.id,
    name: group.name,
    status: group.status,
    isOwner: group.isOwner,
    currentMemberCount: group.currentNumber,
    maxMemberCount: group.maxNumber,
    startDate: new Date(group.startDate),
    endDate: new Date(group.expiredDate),
    ownerName: group.ownerName,
  };
};

export default deserializeManitoGroup;
