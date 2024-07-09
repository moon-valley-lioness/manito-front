import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MANITO_GROUP_DETAIL } from '@/manito_group/constant/query_key'
import { inviteGroup } from '@/manito_group/lib/fetch'

export const useInviteGroupMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: inviteGroup,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [MANITO_GROUP_DETAIL, variables.groupId],
            })
        },
    })

    return mutation
}
