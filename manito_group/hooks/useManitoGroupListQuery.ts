import { MANITO_GROUP_LIST_QUERY_KEY } from '@/manito_group/constant/query_key';
import { fetchGroupList } from '@/manito_group/lib/fetch';
import { useQuery } from '@tanstack/react-query';
import { GroupStatus } from '../model';

const useManitoGroupListQuery = (status: GroupStatus) => {
  return useQuery({
    queryKey: [MANITO_GROUP_LIST_QUERY_KEY, status],
    queryFn: () => fetchGroupList(status),
    refetchOnWindowFocus: false,
  });
};

export default useManitoGroupListQuery;
