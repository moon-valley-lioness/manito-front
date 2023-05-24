import useChatOpponentQuery from '@/manito_group/hooks/query/useChatOpponentQuery';
import { DeserializedManitoGroup } from '@/manito_group/model';
import Chatting from './Chatting';
import { useEffect, useRef, useState } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { SOCKET_URL } from '@/common/constants/url';
import { getAccessToken } from '@/auth/lib/cookie';

export default function OngoingGroupDetail({ groupData }: { groupData: DeserializedManitoGroup }) {
  const { data, isLoading, isError } = useChatOpponentQuery(groupData.id);
  const [chatId, setChatId] = useState<number>();
  const [client, setClient] = useState<CompatClient>();

  useEffect(() => {
    if (!data) return;

    const sock = new SockJS(SOCKET_URL);
    const client = Stomp.over(sock);
    const token = getAccessToken();

    client.connect({ Authorization: `Bearer ${token}` }, function (frame: any) {
      setClient(client);
      console.log('Connected: ' + frame);
    });
  }, [data]);

  useEffect(() => {
    if (!client || !data) return;

    client.subscribe(`/topic/chat/${data.manitoChatId}`, function (chatMessage) {
      alert(JSON.parse(chatMessage.body).message);
    });
    client.subscribe(`/topic/chat/${data.maniteeChatId}`, function (chatMessage) {
      alert(JSON.parse(chatMessage.body).message);
    });

    client.onDisconnect = () => {
      setClient(undefined);
    };

    return () => {
      client.deactivate();
      setClient(undefined);
      console.log('Disconnected');
    };
  }, [client, data]);

  const handleChatSelect = (opponentId: number) => {
    setChatId(opponentId);
  };

  return (
    <div className='flex-auto grid grid-cols-4 h-full border-b-2'>
      <section className='col-span-1 border-r-2'>
        {data && (
          <ul>
            <ChatOpponent
              chatId={data.manitoChatId}
              type='manito'
              onSelect={handleChatSelect}
              isActive={data.manitoChatId === chatId}
            />
            <ChatOpponent
              chatId={data.maniteeChatId}
              type='manitee'
              onSelect={handleChatSelect}
              isActive={data.maniteeChatId === chatId}
            />
          </ul>
        )}
      </section>
      <section className='col-span-3'>
        {chatId && client && <Chatting chatId={chatId} chatClient={client} />}
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
