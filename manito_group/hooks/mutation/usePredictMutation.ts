import { useMutation, useQueryClient } from '@tanstack/react-query'
import { END_RESULT } from '../../constant/query_key'
import { submitPredict } from '../../lib/fetch'

export const usePredictMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: submitPredict,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [END_RESULT, variables.groupId],
            })
        },
    })

    return mutation
}
