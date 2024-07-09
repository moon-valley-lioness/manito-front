import { CompatClient, Stomp } from '@stomp/stompjs'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import SockJS from 'sockjs-client'

import { getAccessToken } from '@/auth/lib/cookie'
import { SOCKET_URL } from '@/common/constants/url'

import { websocketClient, websocketConnected } from '../state'

export function useHandleConnectChat() {
    const setIsConnected = useSetAtom(websocketConnected)
    const setClient = useSetAtom(websocketClient)

    useEffect(() => {
        const sock = new SockJS(SOCKET_URL)
        const c = Stomp.over(sock)
        setClient(c)
        connectToChat(c)

        return () => {
            c.deactivate()
            setClient(undefined)
            setIsConnected(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setIsConnected, setClient])

    function connectToChat(client: CompatClient) {
        const token = getAccessToken()
        console.log('connectToChat', { token })
        client.connect(
            { Authorization: `Bearer ${token}` },
            (frame: any) => {
                console.log(frame)
                setIsConnected(true)
            },
            () => {
                console.error('connect fail')
            }
        )
    }
}
