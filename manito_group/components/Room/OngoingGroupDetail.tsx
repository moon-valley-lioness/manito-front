import useChatOpponentQuery from '@/manito_group/hooks/query/useChatOpponentQuery';
import { Chat, DeserializedManitoGroup } from '@/manito_group/model';
import Chatting from './Chatting';
import { useEffect, useRef, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { SOCKET_URL } from '@/common/constants/url';
import { getAccessToken } from '@/auth/lib/cookie';
import useChatHistoryQuery from '@/manito_group/hooks/query/useChatHistoryQuery';
import { useQueryClient } from '@tanstack/react-query';
import { CHAT_HISTORY } from '@/manito_group/constant/query_key';
import { setTimeout } from 'timers';

const sock = new SockJS(SOCKET_URL);
const client = Stomp.over(sock);

function connectToChat(onSucess: (frame: any) => void, onFail: () => void) {
  const token = getAccessToken();
  client.connect({ Authorization: `Bearer ${token}` }, onSucess, onFail);
}

export default function OngoingGroupDetail({ groupData }: { groupData: DeserializedManitoGroup }) {
  const [chatId, setChatId] = useState<number>();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const { data: chatOpponents } = useChatOpponentQuery(groupData.id);
  const timerRef = useRef<NodeJS.Timer>();

  // prefetch
  useChatHistoryQuery(chatOpponents?.manitoChatId);
  useChatHistoryQuery(chatOpponents?.maniteeChatId);

  const handleConnectSuccess = (frame: any) => {
    console.log(frame);
    setIsConnected(true);
  };
  const handleConnectFail = () => {
    if (isConnected) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      connectToChat(handleConnectSuccess, handleConnectFail);
    }, 1000);
  };

  // try to connect websocket
  useEffect(() => {
    connectToChat(handleConnectSuccess, handleConnectFail);
    return () => {
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryClient = useQueryClient();

  function updateChatCache(queryKey: any, chatMessage: any) {
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
  }

  // subscribe chat
  useEffect(() => {
    if (!isConnected || !chatOpponents) return;

    try {
      client.subscribe(`/topic/chat/${chatOpponents.manitoChatId}`, function (chatMessage) {
        const queryKey = [CHAT_HISTORY, chatOpponents.manitoChatId];
        updateChatCache(queryKey, chatMessage);
      });
      client.subscribe(`/topic/chat/${chatOpponents.maniteeChatId}`, function (chatMessage) {
        const queryKey = [CHAT_HISTORY, chatOpponents.maniteeChatId];
        updateChatCache(queryKey, chatMessage);
      });
    } catch (e) {
      client.deactivate();
      connectToChat(handleConnectSuccess, handleConnectFail);
    }

    client.onDisconnect = () => {
      setIsConnected(false);
    };

    client.onWebSocketError = () => {
      setIsConnected(false);
      client.deactivate();
      connectToChat(handleConnectSuccess, handleConnectFail);
    };

    return () => {
      client.deactivate();
      setIsConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chatOpponents]);

  // set initial chatId
  useEffect(() => {
    if (!chatOpponents) return;

    if (!chatId) {
      setChatId(chatOpponents.manitoChatId);
    }
  }, [chatId, chatOpponents]);

  const handleChatSelect = (opponentId: number) => {
    setChatId(opponentId);
  };

  return (
    <div className='grid grid-cols-4 border-b-2 h-full'>
      <section className='col-span-1 border-r-2'>
        {chatOpponents && (
          <ul>
            <ChatOpponent
              chatId={chatOpponents.manitoChatId}
              type='manito'
              onSelect={handleChatSelect}
              isActive={chatOpponents.manitoChatId === chatId}
            />
            <ChatOpponent
              chatId={chatOpponents.maniteeChatId}
              type='manitee'
              onSelect={handleChatSelect}
              isActive={chatOpponents.maniteeChatId === chatId}
            />
          </ul>
        )}
      </section>
      <section className='col-span-3 max-h-full overflow-hidden'>
        {chatId && <Chatting chatId={chatId} chatClient={client} />}
      </section>
    </div>
  );
}

function ChatOpponent({
  chatId,
  type,
  onSelect,
  isActive,
}: {
  chatId: number;
  type: 'manito' | 'manitee';
  onSelect: (chatId: number) => void;
  isActive: boolean;
}) {
  return (
    <li
      onClick={() => onSelect(chatId)}
      className={`${
        isActive && 'bg-sky-500 text-white'
      } h-14 border-b-2 flex justify-center items-center font-bold hover:bg-gray-400 hover:text-white hover:cursor-pointer`}
    >
      <div>{type == 'manito' ? '내가 도와주는 사람' : '나를 도와주는 사람'}</div>
    </li>
  );
}
