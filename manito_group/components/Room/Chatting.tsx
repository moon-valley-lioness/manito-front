import { useEffect, useRef, useState } from 'react';
import { Stomp, CompatClient, IFrame } from '@stomp/stompjs';
import { SOCKET_URL } from '@/common/constants/url';
import SockJS from 'sockjs-client';
import { getAccessToken } from '@/auth/lib/cookie';

export default function Chatting() {
  const [isConnected, setIsConnected] = useState(false);
  const client = useRef<CompatClient>();

  useEffect(() => {
    const sock = new SockJS(SOCKET_URL);
    client.current = Stomp.over(sock);
    const token = getAccessToken();
    client.current.connect({ Authorization: `Bearer ${token}` }, function (frame: any) {
      setIsConnected(true);
      console.log('Connected: ' + frame);
      client.current?.subscribe('/topic/greetings', function (greeting) {
        alert(JSON.parse(greeting.body).content);
      });
    });
    client.current.onDisconnect = () => {
      setIsConnected(false);
    };

    return () => {
      client.current?.deactivate();
      setIsConnected(false);
      console.log('Disconnected');
    };
  }, []);

  function sendName() {
    client.current?.send('/app/hello', {}, JSON.stringify({ name: 'hyunjin' }));
  }

  return (
    <div className='w-screen flex justify-center items-center flex-col'>
      <h1>is Connected?</h1>
      <h2>{isConnected ? 'YES' : 'NO'}</h2>
      <button onClick={sendName}>send</button>
    </div>
  );
}
