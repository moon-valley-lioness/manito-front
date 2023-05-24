import { useState } from 'react';
import { CompatClient } from '@stomp/stompjs';

import useUserInfoQuery from '@/user/hooks/useUserInfoQuery';
import styles from '@/common/styles';

export default function Chatting({
  chatId,
  chatClient,
}: {
  chatId: number;
  chatClient: CompatClient;
}) {
  const { data: userData } = useUserInfoQuery();

  const [message, setMessage] = useState('');

  function sendName() {
    chatClient.send(
      `/app/chat/${chatId}`,
      {},
      JSON.stringify({
        sendUserId: userData?.id,
        message,
        createdAt: new Date(),
      })
    );
  }

  return (
    <div className='w-full h-full flex flex-col relative bg-sky-100'>
      <ul className='w-full p-10'>
        <ChatBox
          type='opponent'
          message='정지현바보정지현바보정지현바보정지현바보정지현바보정지현바보정지현바보정지현바보정지현바보정지현바보'
        />
        <ChatBox
          type='me'
          message='인정또인정인정또인정인정또인정인정또인정인정또인정인정또인정인정또인정인정또인정인정또인정인정또인정인정또인정'
        />
      </ul>
      <div className='flex gap-4 flex-auto w-full max-h-30 items-center absolute bottom-0 right-0 p-10'>
        <input
          className='border-2 flex-auto h-10'
          type='text'
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={`${styles.button.black} p-2`} onClick={sendName}>
          send
        </button>
      </div>
    </div>
  );
}

function ChatBox({ type, message }: { type: 'me' | 'opponent'; message: string }) {
  return (
    <li className={`flex flex-col ${type === 'me' ? 'items-end' : 'items-start'}`}>
      <label className='font-bold mb-2'>{type === 'me' ? '나' : '상대'}</label>
      <div className='rounded bg-white p-4 w-1/3'>{message}</div>
    </li>
  );
}
