import { Chat, DeserializedManitoGroup, GroupStatus } from '@/manito_group/model';
import Chatting from './Chatting';
import { useCallback, useEffect } from 'react';
import { ActivationState } from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import { CHAT_HISTORY } from '@/manito_group/constant/query_key';
import { useSetAtom } from 'jotai';
import { writeNewIncomingChat } from '@/manito_group/state';
import useGetChatOpponents from '@/manito_group/hooks/useGetChatOpponents';
import useHandleConnectChat from '@/manito_group/hooks/useHandleConnectChat';
import ChatOpponent from './ChatOpponent';

export default function OngoingGroupDetail({ groupData }: { groupData: DeserializedManitoGroup }) {
  const chatOpponents = useGetChatOpponents(groupData.id);
  const { isConnected, client } = useHandleConnectChat();

  /**
   * below code is subscribe chat room and handling
   */
  const queryClient = useQueryClient();
  const updateChatCache = useCallback(
    (queryKey: any, chatMessage: any) => {
      const previous = queryClient.getQueryData<Chat[]>(queryKey) ?? [];
      const serializedMsg = JSON.parse(chatMessage.body);
      const newMsg: Chat = {
        id: serializedMsg.id,
        sendUserId: serializedMsg.sendUserId,
        message: serializedMsg.message,
        createdAt: new Date(serializedMsg.createdAt),
      };
      const updated = [...previous, newMsg];
      queryClient.setQueryData(queryKey, updated);
    },
    [queryClient]
  );
  const addNewIncomingChat = useSetAtom(writeNewIncomingChat);
  useEffect(() => {
    if (!isConnected || !chatOpponents || client.state !== ActivationState.ACTIVE) return;

    try {
      client.subscribe(`/topic/chat/${chatOpponents.manitoChatId}`, function (chatMessage) {
        const queryKey = [CHAT_HISTORY, chatOpponents.manitoChatId];
        updateChatCache(queryKey, chatMessage);
        addNewIncomingChat(chatOpponents.manitoChatId);
      });
      client.subscribe(`/topic/chat/${chatOpponents.maniteeChatId}`, function (chatMessage) {
        const queryKey = [CHAT_HISTORY, chatOpponents.maniteeChatId];
        updateChatCache(queryKey, chatMessage);
        addNewIncomingChat(chatOpponents.maniteeChatId);
      });
    } catch (e) {
      console.error(e);
    }
  }, [isConnected, chatOpponents, client, updateChatCache, addNewIncomingChat]);

  return (
    <div className='grid grid-cols-4 border-b-2 h-full'>
      <section className='col-span-1 border-r-2'>
        {chatOpponents && (
          <ul>
            <ChatOpponent
              chatId={chatOpponents.manitoChatId}
              type='manito'
              opponentName={chatOpponents.manitoName}
            />
            <ChatOpponent chatId={chatOpponents.maniteeChatId} type='manitee' />
          </ul>
        )}
      </section>
      <section className='col-span-3 max-h-full overflow-hidden'>
        <Chatting chatClient={client} status={GroupStatus.ONGOING} />
      </section>
    </div>
  );
}
