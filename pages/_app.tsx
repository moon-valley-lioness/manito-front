import type { AppProps } from 'next/app'

import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'

import { useHandleConnectChat } from '@/manito_group/hooks'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient())
    useHandleConnectChat()

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={pageProps.dehydratedState}>
                <Component {...pageProps} />
                <ReactQueryDevtools />
            </HydrationBoundary>
        </QueryClientProvider>
    )
}
