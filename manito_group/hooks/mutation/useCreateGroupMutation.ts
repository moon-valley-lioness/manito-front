import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MANITO_GROUP_LIST_QUERY_KEY } from '../../constant/query_key'
import { GroupStatus } from '../../model'
import { createGroup } from '../../lib/fetch'

export const useCreateGroupMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: createGroup,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [MANITO_GROUP_LIST_QUERY_KEY, GroupStatus.WAITING],
            })
        },
    })

    return mutation
}
