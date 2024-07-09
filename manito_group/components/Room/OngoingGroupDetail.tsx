import {
    Chat,
    DeserializedManitoGroup,
    GroupStatus,
} from '@/manito_group/model'
import Chatting from './Chatting'
import { useCallback, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { CHAT_HISTORY } from '@/manito_group/constant/query_key'
import { useAtom, useSetAtom } from 'jotai'
import {
    websocketClient,
    websocketConnected,
    writeNewIncomingChat,
} from '@/manito_group/state'
import useGetChatOpponents from '@/manito_group/hooks/useGetChatOpponents'
import ChatOpponent from './ChatOpponent'

const subscriptions = new Map()

export default function OngoingGroupDetail({
    groupData,
}: {
    groupData: DeserializedManitoGroup
}) {
    const chatOpponents = useGetChatOpponents(groupData.id)
    const [isConnected] = useAtom(websocketConnected)
    const [client] = useAtom(websocketClient)

    /**
     * below code is subscribe chat room and handling
     */
    const queryClient = useQueryClient()
    const updateChatCache = useCallback(
        (queryKey: any, chatMessage: any) => {
            const previous = queryClient.getQueryData<Chat[]>(queryKey) ?? []
            const serializedMsg = JSON.parse(chatMessage.body)
            const newMsg: Chat = {
                id: serializedMsg.id,
                sendUserId: serializedMsg.sendUserId,
                message: serializedMsg.message,
                createdAt: new Date(serializedMsg.createdAt),
            }
            const updated = [...previous, newMsg]
            queryClient.setQueryData(queryKey, updated)
        },
        [queryClient]
    )
    const addNewIncomingChat = useSetAtom(writeNewIncomingChat)
    useEffect(() => {
        console.log('isConnected', isConnected)
        if (!chatOpponents || !isConnected || !client) return

        const prefix = '/topic/chat/'
        const keys = [chatOpponents.manitoChatId, chatOpponents.maniteeChatId]
        try {
            keys.forEach((key) => {
                if (!subscriptions.get(key)) {
                    const sub = client.subscribe(
                        `${prefix}${key}`,
                        (chatMessage) => {
                            const queryKey = [CHAT_HISTORY, key]
                            updateChatCache(queryKey, chatMessage)
                            addNewIncomingChat(key)
                        }
                    )
                    subscriptions.set(key, sub)
                }
            })
        } catch (e) {
            console.error(e)
        }
    }, [
        isConnected,
        client,
        chatOpponents,
        updateChatCache,
        addNewIncomingChat,
    ])

    return (
        <div className="grid grid-cols-4 border-b-2 h-full">
            <section className="col-span-1 border-r-2">
                {chatOpponents && (
                    <ul>
                        <ChatOpponent
                            chatId={chatOpponents.manitoChatId}
                            type="manito"
                            opponentName={chatOpponents.manitoName}
                        />
                        <ChatOpponent
                            chatId={chatOpponents.maniteeChatId}
                            type="manitee"
                        />
                    </ul>
                )}
            </section>
            <section className="col-span-3 max-h-full overflow-hidden">
                <Chatting chatClient={client} status={GroupStatus.ONGOING} />
            </section>
        </div>
    )
}
