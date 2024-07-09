import { useQuery } from '@tanstack/react-query'

import { CHAT_OPPONENT } from '@/manito_group/constant/query_key'
import { getChatOpponent } from '@/manito_group/lib/fetch'

export function useChatOpponentQuery(groupId: number) {
    return useQuery({
        queryKey: [CHAT_OPPONENT, groupId],
        queryFn: () => getChatOpponent({ groupId }),
        refetchOnWindowFocus: false,
    })
}
