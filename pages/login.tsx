import useLoginFormHandler from '@/hooks/useLoginFormHandler';
import { setUserToken } from '@/lib/user';
import { useRouter } from 'next/router';
import { FormEventHandler, useCallback } from 'react';
import { setCookie } from 'cookies-next';
import { REFRESH_TOKEN_KEY } from '@/constant/cookie';

export default function Login() {
  const router = useRouter();
  const { id, pwd, handleIdInput, handlePwdInput } = useLoginFormHandler();

  const handleLogin: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // 서버로 보내기

    setUserToken(id + pwd);
    setCookie(REFRESH_TOKEN_KEY, id + pwd);
    router.push('/');
  };

  const handleRegisterBtn = useCallback(() => {
    router.push('/register');
  }, [router]);

  return (
    <main>
      <form onSubmit={handleLogin}>
        <input type='text' placeholder='아이디' value={id} onChange={handleIdInput} />
        <input type='password' placeholder='비밀번호' value={pwd} onChange={handlePwdInput} />
        <button>로그인</button>
      </form>
      <button onClick={handleRegisterBtn}>회원가입</button>
    </main>
  );
}
