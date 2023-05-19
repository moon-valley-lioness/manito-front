import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  INVITED_MANITO_GROUP_LIST,
  MANITO_GROUP_LIST_QUERY_KEY,
} from '@/manito_group/constant/query_key';
import { answerToInvite } from '@/manito_group/lib/fetch';
import { GroupStatus } from '@/manito_group/model';

const useInviteAnswerMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: answerToInvite,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries([INVITED_MANITO_GROUP_LIST]);
      if (variables.isAccept) {
        queryClient.invalidateQueries([MANITO_GROUP_LIST_QUERY_KEY, GroupStatus.WAITING]);
      }
    },
  });

  return mutation;
};

export default useInviteAnswerMutation;
