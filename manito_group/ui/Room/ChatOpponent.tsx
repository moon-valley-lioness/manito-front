import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { PredictStatus } from '@/manito_group/model'
import {
    currentChatId,
    readNewIncomingChat,
    writeToChatIsReaded,
} from '@/manito_group/state'

export default function ChatOpponent({
    chatId,
    type,
    opponentName,
    predictResult,
}: {
    chatId: number
    type: 'manito' | 'manitee'
    opponentName?: string
    predictResult?: PredictStatus
}) {
    const [activeChatId, setActiveChatId] = useAtom(currentChatId)
    const [newChatIncoming] = useAtom(readNewIncomingChat)
    const setIsReaded = useSetAtom(writeToChatIsReaded)

    useEffect(() => {
        if (activeChatId === chatId) {
            setIsReaded(chatId)
        }
    }, [chatId, activeChatId, setIsReaded])

    return (
        <li
            onClick={() => setActiveChatId(chatId)}
            className={`${
                activeChatId === chatId && 'bg-sky-500 text-white'
            } px-5 py-2 min-h-14 border-b-2 flex justify-center items-center font-bold break-all hover:bg-gray-400 hover:text-white hover:cursor-pointer`}
        >
            <div className="w-2/3 text-center">
                <span>
                    {type == 'manito'
                        ? '내가 도와주는 사람'
                        : '나를 도와주는 사람'}
                </span>
                {opponentName ? (
                    <span
                        className={
                            predictResult
                                ? `${
                                      predictResult === PredictStatus.CORRECT
                                          ? 'text-blue-400'
                                          : 'text-red-400'
                                  }`
                                : ''
                        }
                    >
                        ({opponentName})
                    </span>
                ) : null}
            </div>
            <div className="w-1/3 flex justify-end">
                {newChatIncoming[chatId] > 0 && (
                    <div className="w-6 h-6 bg-red-400 rounded-full text-white flex justify-center items-center">
                        {newChatIncoming[chatId]}
                    </div>
                )}
            </div>
        </li>
    )
}
