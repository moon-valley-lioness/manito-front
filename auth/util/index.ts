import { AxiosRequestConfig } from 'axios'

import { axiosInstance } from '@/common/lib/axios-instance'

import { getAccessTokenAnyway } from '../lib/jwt'

export async function getWithToken(url: string, config?: AxiosRequestConfig) {
    const token = await getAccessTokenAnyway()
    return axiosInstance.get(url, {
        ...config,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export async function postWithToken(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>
) {
    const token = await getAccessTokenAnyway()
    return axiosInstance.post(url, data, {
        ...config,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export async function putWithToken(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>
) {
    const token = await getAccessTokenAnyway()
    return axiosInstance.put(url, data, {
        ...config,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
