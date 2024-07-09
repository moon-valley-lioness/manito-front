import { INVITE_DETAIL } from '@/manito_group/constant/query_key'
import { getInviteDetail } from '@/manito_group/lib/fetch'
import { useQuery } from '@tanstack/react-query'

export default function useInviteDetailQuery(groupId: number) {
    return useQuery({
        queryKey: [INVITE_DETAIL, groupId],
        queryFn: () => getInviteDetail({ groupId }),
    })
}
