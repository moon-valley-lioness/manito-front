import { USER_INFO_QUERY_KEY } from '@/user/constant/query_key';
import { fetchUserInfo } from '@/user/lib/fetch';
import { useQuery } from '@tanstack/react-query';

const useUserInfoQuery = () => {
  return useQuery({
    queryKey: [USER_INFO_QUERY_KEY],
    queryFn: () => fetchUserInfo(),
    refetchOnWindowFocus: false,
  });
};

export default useUserInfoQuery;
