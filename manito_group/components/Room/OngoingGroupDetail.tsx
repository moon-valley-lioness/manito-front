import useChatOpponentQuery from '@/manito_group/hooks/query/useChatOpponentQuery';
import { DeserializedManitoGroup } from '@/manito_group/model';
import Chatting from './Chatting';
import { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { SOCKET_URL } from '@/common/constants/url';
import { getAccessToken } from '@/auth/lib/cookie';
import useChatHistoryQuery from '@/manito_group/hooks/query/useChatHistoryQuery';
import { useQueryClient } from '@tanstack/react-query';
import { CHAT_HISTORY } from '@/manito_group/constant/query_key';

const sock = new SockJS(SOCKET_URL);
const client = Stomp.over(sock);

export default function OngoingGroupDetail({ groupData }: { groupData: DeserializedManitoGroup }) {
  const [chatId, setChatId] = useState<number>();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const { data: chatOpponents } = useChatOpponentQuery(groupData.id);

  // prefetch
  useChatHistoryQuery(chatOpponents?.manitoChatId);
  useChatHistoryQuery(chatOpponents?.maniteeChatId);

  // try to connect websocket
  useEffect(() => {
    const token = getAccessToken();
    client.connect(
      { Authorization: `Bearer ${token}` },
      function (frame: any) {
        setIsConnected(true);
        console.log('Connected: ' + frame);
      },
      function () {
        setIsConnected(false);
        alert('채팅 연결 실패');
      }
    );
  }, []);

  const queryClient = useQueryClient();

  // subscribe chat
  useEffect(() => {
    if (!isConnected || !chatOpponents) return;

    try {
      client.subscribe(`/topic/chat/${chatOpponents.manitoChatId}`, function (chatMessage) {
        queryClient.invalidateQueries([CHAT_HISTORY, chatOpponents.manitoChatId]);
      });
      client.subscribe(`/topic/chat/${chatOpponents.maniteeChatId}`, function (chatMessage) {
        queryClient.invalidateQueries([CHAT_HISTORY, chatOpponents.maniteeChatId]);
      });
    } catch (e) {
      alert('채팅 구독 중 에러');
    }

    client.onDisconnect = () => {
      setIsConnected(false);
      alert('연결 해제');
    };

    client.onWebSocketError = () => {
      setIsConnected(false);
      alert('소켓 에러');
    };

    return () => {
      client.deactivate();
      setIsConnected(false);
      console.log('Disconnected');
    };
  }, [isConnected, chatOpponents, queryClient]);

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
      <div>{chatId}</div>
    </li>
  );
}
