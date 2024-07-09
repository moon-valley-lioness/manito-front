import { useQuery } from '@tanstack/react-query'

import { CHAT_HISTORY } from '@/manito_group/constant/query_key'
import { getChatHistory } from '@/manito_group/lib/fetch'

export function useChatHistoryQuery(chatId?: number) {
    return useQuery({
        queryKey: [CHAT_HISTORY, chatId],
        queryFn: () => {
            if (chatId) return getChatHistory({ chatId })
            else throw Error('there is no chatId')
        },
        refetchOnWindowFocus: false,
        enabled: chatId !== undefined && chatId !== null,
    })
}
