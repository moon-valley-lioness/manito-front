import { MANITO_GROUP_LIST_QUERY_KEY } from '@/constant/manito_group';
import { fetchGroupList } from '@/lib/manito_group';
import { useQuery } from '@tanstack/react-query';

const useManitoGroupListQuery = () => {
  return useQuery({ queryKey: [MANITO_GROUP_LIST_QUERY_KEY], queryFn: fetchGroupList });
};

export default useManitoGroupListQuery;
