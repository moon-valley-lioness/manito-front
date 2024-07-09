import { CHAT_OPPONENT } from '@/manito_group/constant/query_key'
import { getChatOpponent } from '@/manito_group/lib/fetch'
import { useQuery } from '@tanstack/react-query'

export default function useChatOpponentQuery(groupId: number) {
    return useQuery({
        queryKey: [CHAT_OPPONENT, groupId],
        queryFn: () => getChatOpponent({ groupId }),
        refetchOnWindowFocus: false,
    })
}
