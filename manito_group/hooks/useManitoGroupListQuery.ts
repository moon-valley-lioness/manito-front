import { MANITO_GROUP_LIST_QUERY_KEY } from '@/manito_group/constant/query_key';
import { fetchGroupList } from '@/manito_group/lib/fetch';
import { useQuery } from '@tanstack/react-query';
import { GroupStatus } from '../model';
import deserializeManitoGroup from '../lib/deserializeManitoGroup';

const fetcher = async (status: GroupStatus) => {
  const list = await fetchGroupList(status);

  return list.map((g) => deserializeManitoGroup(g));
};

const useManitoGroupListQuery = (status: GroupStatus) => {
  return useQuery({
    queryKey: [MANITO_GROUP_LIST_QUERY_KEY, status],
    queryFn: () => fetcher(status),
    refetchOnWindowFocus: false,
  });
};

export default useManitoGroupListQuery;
