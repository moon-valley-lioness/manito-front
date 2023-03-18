import useIsRouting from '@/hooks/useIsRouting';
import { getUserToken } from '@/lib/user';

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const checkIsLoggedIn = useCallback(async () => {
    
    const isLoggedIn = getUserToken();

    if (isLoggedIn) {
      router.push('/');
    } else {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    checkIsLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isRouting = useIsRouting();

  return isRouting ? <h1>loading...</h1> : <Component {...pageProps} />
}
