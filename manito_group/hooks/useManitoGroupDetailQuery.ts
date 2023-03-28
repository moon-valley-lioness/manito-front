import { useQuery } from '@tanstack/react-query';
import { MANITO_GROUP_DETAIL } from '../constant/query_key';
import { fetchGroupDetail } from '../lib/fetch';

const useManitoGroupDetailQuery = (groupId: string) => {
  return useQuery([MANITO_GROUP_DETAIL, groupId], () => fetchGroupDetail(groupId));
};

export default useManitoGroupDetailQuery;
