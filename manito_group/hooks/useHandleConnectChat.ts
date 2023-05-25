import { getAccessToken } from '@/auth/lib/cookie';
import { SOCKET_URL } from '@/common/constants/url';
import { Stomp } from '@stomp/stompjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

const sock = new SockJS(SOCKET_URL);
const client = Stomp.over(sock);

function connectToChat(onSucess: (frame: any) => void, onFail: () => void) {
  const token = getAccessToken();
  client.connect({ Authorization: `Bearer ${token}` }, onSucess, onFail);
}

export default function useHandleConnectChat() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timer>();

  const handleConnectSuccess = useCallback((frame: any) => {
    console.log(frame);
    setIsConnected(true);
  }, []);

  // TODO do i have to reconnect manually?
  const handleConnectFail = () => {
    console.error('connect fail');
    setIsConnected(false);
    // if (isConnected) return;
    // if (timerRef.current) {
    //   clearTimeout(timerRef.current);
    // }
    // timerRef.current = setTimeout(() => {
    //   connectToChat(handleConnectSuccess, handleConnectFail);
    // }, 3000);
  };

  function tryConnectToChat() {
    if (isConnected) return;
    connectToChat(handleConnectSuccess, handleConnectFail);
  }

  function setEventListnerToClient() {
    client.onConnect = () => {
      setIsConnected(true);
    };
    client.onDisconnect = () => {
      setIsConnected(false);
    };
  }

  // try to connect websocket
  useEffect(() => {
    setEventListnerToClient();
    tryConnectToChat();
    return () => {
      // if (timerRef.current) {
      //   clearTimeout(timerRef.current);
      // }
      client.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isConnected, client };
}
