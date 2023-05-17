import { INVITED_MANITO_GROUP_LIST } from '@/manito_group/constant/query_key';
import { fetchInvitedGroupList } from '@/manito_group/lib/fetch';
import { useQuery } from '@tanstack/react-query';

const useInvitedManitoGroupListQuery = () => {
  return useQuery({
    queryKey: [INVITED_MANITO_GROUP_LIST],
    queryFn: fetchInvitedGroupList,
    refetchOnWindowFocus: false,
  });
};

export default useInvitedManitoGroupListQuery;
