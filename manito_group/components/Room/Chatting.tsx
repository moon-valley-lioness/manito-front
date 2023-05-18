import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { SOCKET_URL } from '@/common/constants/url';

export default function Chatting() {
  const [isConnected, setIsConnected] = useState(false);
  const client = useRef<Client>();

  useEffect(() => {
    client.current = new Client({
      brokerURL: `${SOCKET_URL}`,
      onConnect: () => {
        alert('연결성공!');
        setIsConnected(true);
        // client.subscribe('/topic/test01', (message) => console.log(`Received: ${message.body}`));
        // client.publish({ destination: '/topic/test01', body: 'First Message' });
      },
      onStompError: () => {
        alert('연결실패');
        setIsConnected(false);
      },
      // Wait 1 second before attempting to reconnect,
      reconnectDelay: 10000,
      onWebSocketError: (event) => {
        alert('WEBSOCKET ERROR');
        setIsConnected(false);
      },
    });

    client.current?.activate();

    return () => {
      client.current?.deactivate();
    };
  }, []);

  return (
    <>
      <h1>is Connected?</h1>
      <h2>{isConnected ? 'YES' : 'NO'}</h2>
    </>
  );
}
