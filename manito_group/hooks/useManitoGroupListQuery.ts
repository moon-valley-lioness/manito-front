import { MANITO_GROUP_LIST_QUERY_KEY } from '@/manito_group/constant/query_key';
import { fetchGroupList } from '@/manito_group/lib/fetch';
import { useQuery } from '@tanstack/react-query';

const useManitoGroupListQuery = () => {
  return useQuery({
    queryKey: [MANITO_GROUP_LIST_QUERY_KEY],
    queryFn: fetchGroupList,
    refetchOnWindowFocus: false,
  });
};

export default useManitoGroupListQuery;
