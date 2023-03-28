import { clearAuthToken } from '@/auth/lib/cookie';
import useUserInfoQuery from '@/user/hooks/useUserInfoQuery';
import Link from 'next/link';
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
    <header className='h-14 w-full flex justify-between items-center font-semibold px-4 fixed top-0 left-0 right-0 border-b border-gray-500 bg-white'>
      <nav className='cursor-pointer'>
        <Link href='/'>HOME</Link>
      </nav>
      <div className='flex gap-4 items-center'>
        <div>{data?.id}</div>
        <button
          className='rounded-lg bg-slate-700 text-white py-1 px-2 hover:bg-gray-500'
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default Header;
