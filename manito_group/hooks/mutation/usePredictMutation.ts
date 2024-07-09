import { useMutation, useQueryClient } from '@tanstack/react-query'
import { END_RESULT } from '../../constant/query_key'
import { submitPredict } from '../../lib/fetch'

const usePredictMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: submitPredict,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries([END_RESULT, variables.groupId])
        },
    })

    return mutation
}

export default usePredictMutation
