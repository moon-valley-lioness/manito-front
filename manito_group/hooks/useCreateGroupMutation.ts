import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MANITO_GROUP_LIST_QUERY_KEY } from '../constant/query_key';
import { GroupStatus, DeserializedManitoGroup } from '../model';

const useCreateGroupMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newGroup: DeserializedManitoGroup) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(newGroup);
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([MANITO_GROUP_LIST_QUERY_KEY, GroupStatus.ONGOING]);
    },
  });

  return mutation;
};

export default useCreateGroupMutation;
