import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MANITO_GROUP_DETAIL } from '../constant/query_key';
import { inviteGroup } from '../lib/fetch';

const useInviteGroupMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: inviteGroup,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries([MANITO_GROUP_DETAIL, variables.groupId]);
    },
  });

  return mutation;
};

export default useInviteGroupMutation;
