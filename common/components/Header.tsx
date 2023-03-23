import { clearAuthToken } from '@/auth/lib/cookie';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const Header = () => {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    clearAuthToken();
    router.push('/login');
  }, [router]);

  return (
    <header>
      <button onClick={handleLogout}>로그아웃</button>
    </header>
  );
};

export default Header;
