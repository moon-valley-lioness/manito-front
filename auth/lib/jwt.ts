import { OptionsType } from 'cookies-next/lib/types'

import { getAccessToken, getRefreshToken, setAuthToken } from './cookie'
import { refetchAuthToken } from './fetch'

export const getAccessTokenAnyway = async (
    options?: OptionsType | undefined
) => {
    let accessToken = getAccessToken(options)
    if (!accessToken) {
        console.log('access token 재발급')
        const refreshToken = getRefreshToken(options)
        if (!refreshToken) throw Error('재로그인 필요')

        const jwt = await refetchAuthToken(String(refreshToken))
        if (!jwt) throw Error('토근 갱신 중 에러')
        setAuthToken(jwt, options)
        accessToken = jwt.accessToken
    }
    return String(accessToken)
}
