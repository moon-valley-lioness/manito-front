import { CompatClient } from '@stomp/stompjs'
import { useAtom } from 'jotai'
import { FormEventHandler, useEffect, useRef, useState } from 'react'

import styles from '@/common/styles'
import { useChatHistoryQuery } from '@/manito_group/hooks'
import { Chat, GroupStatus } from '@/manito_group/model'
import { currentChatId } from '@/manito_group/state'
import useUserInfoQuery from '@/user/hooks/useUserInfoQuery'

export default function Chatting({
    chatClient,
    status,
}: {
    chatClient?: CompatClient
    status: GroupStatus
}) {
    return (
        <div className="bg-sky-100 h-full">
            <ChatList />
            {status === GroupStatus.ONGOING && chatClient && (
                <ChatInput chatClient={chatClient} />
            )}
        </div>
    )
}

function ChatList() {
    const chatListRef = useRef<HTMLUListElement>(null)
    const [chatId] = useAtom(currentChatId)
    const { data: chatHistory } = useChatHistoryQuery(chatId)
    const { data: userData } = useUserInfoQuery()

    useEffect(() => {
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight
        }
    }, [chatHistory])

    return (
        <ul
            ref={chatListRef}
            className="p-4 overflow-y-scroll"
            style={{
                height: 'calc(100dvh - 15.5rem)',
            }}
        >
            {chatHistory?.map((chat) => (
                <ChatBox
                    key={chat.id}
                    userId={Number(userData?.id)}
                    chatData={chat}
                />
            ))}
        </ul>
    )
}

function ChatInput({ chatClient }: { chatClient: CompatClient }) {
    const [chatId] = useAtom(currentChatId)
    const { data: userData } = useUserInfoQuery()
    const [message, setMessage] = useState('')

    function sendMessage() {
        if (!chatClient.active) {
            console.log('chat client not active')
            return
        }
        try {
            console.log('send message', userData?.id, message)
            chatClient.send(
                `/app/chat/${chatId}`,
                {},
                JSON.stringify({
                    sendUserId: userData?.id,
                    message,
                })
            )
        } catch (e) {
            console.error(e)
            alert('채팅 전송 실패')
        }
        setMessage('')
    }

    const handleSendChat: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if (message.trim().length > 0) {
            sendMessage()
        }
    }

    return (
        <form
            className="flex items-center max-h-30 w-full gap-4 px-4 py-4"
            onSubmit={handleSendChat}
        >
            <input
                className="border-2 flex-auto min-h-10"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className={`${styles.button.black} p-2`}>SEND</button>
        </form>
    )
}

function ChatBox({ userId, chatData }: { userId: number; chatData: Chat }) {
    const isMyChat = userId === chatData.sendUserId
    return (
        <li
            className={`flex flex-col ${isMyChat ? 'items-end' : 'items-start'} mt-4`}
        >
            <label className="font-bold mb-2">{isMyChat ? '나' : '상대'}</label>
            <div
                className={`flex gap-2 w-full ${
                    isMyChat ? 'flex-row-reverse' : ''
                } items-end`}
            >
                <div className="rounded bg-white p-4 flex-1 break-all">
                    {chatData.message}
                </div>
                <div className="text-gray-500">
                    {chatData.createdAt.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </div>
            </div>
        </li>
    )
}
