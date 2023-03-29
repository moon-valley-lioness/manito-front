import { DeserializedManitoGroup, SerializedManitoGroup } from '../model';

const deserializeManitoGroup = (group: SerializedManitoGroup): DeserializedManitoGroup => {
  return {
    ...group,
    startDate: new Date(group.startDate),
    endDate: new Date(group.endDate),
  };
};

export default deserializeManitoGroup;
