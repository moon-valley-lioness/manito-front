import { clearAuthToken } from '@/auth/lib/cookie';
import useUserInfoQuery from '@/user/hooks/useUserInfoQuery';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const Header = () => {
  const { data } = useUserInfoQuery();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    clearAuthToken();
    router.push('/login');
  }, [router]);

  return (
    <header className='h-14 w-full flex justify-end items-center font-semibold gap-4 pr-4 fixed top-0 left-0 right-0 border-b border-gray-500 bg-white'>
      <div>{data?.id}</div>
      <button
        className='rounded-lg bg-slate-700 text-white py-1 px-2 hover:bg-gray-500'
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </header>
  );
};

export default Header;
