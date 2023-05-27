import { END_RESULT } from '@/manito_group/constant/query_key';
import { getEndResult } from '@/manito_group/lib/fetch';
import { useQuery } from '@tanstack/react-query';

export default function useEndResultQuery(groupId: number) {
  return useQuery({
    queryKey: [END_RESULT, groupId],
    queryFn: () => {
      return getEndResult({ groupId });
    },
    refetchOnWindowFocus: false,
  });
}
