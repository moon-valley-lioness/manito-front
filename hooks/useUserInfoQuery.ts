import { USER_INFO_QUERY_KEY } from '@/constant/user';
import { fetchUserInfo } from '@/lib/user';
import { useQuery } from '@tanstack/react-query';

const useUserInfoQuery = () => {
  return useQuery({ queryKey: [USER_INFO_QUERY_KEY], queryFn: fetchUserInfo });
};

export default useUserInfoQuery;
