import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MANITO_GROUP_LIST_QUERY_KEY } from '../constant/query_key';

const useJoinGroupMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (groupId: any) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('ok');
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([MANITO_GROUP_LIST_QUERY_KEY]);
    },
  });

  return mutation;
};

export default useJoinGroupMutation;
