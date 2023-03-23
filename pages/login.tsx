import useLoginFormHandler from '@/auth/hooks/useLoginFormHandler';
import { useRouter } from 'next/router';
import { FormEventHandler, useCallback } from 'react';
import { setAuthToken } from '@/auth/lib/cookie';
import { fetchAuthToken } from '@/auth/lib/fetch';

export default function Login() {
  const router = useRouter();
  const { id, pwd, isAutoLogin, handleIdInput, handlePwdInput, handleAutoLoginCheckbox } =
    useLoginFormHandler();

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const jwt = await fetchAuthToken({ id, pwd });
      jwt.refreshExpiredDate = isAutoLogin ? jwt.refreshExpiredDate : undefined;
      setAuthToken(jwt);

      router.push('/');
    } catch (e) {
      alert(e);
    }
  };

  const handleRegisterBtn = useCallback(() => {
    router.push('/register');
  }, [router]);

  return (
    <main>
      <form onSubmit={handleLogin}>
        <input type='text' placeholder='아이디' value={id} onChange={handleIdInput} />
        <input type='password' placeholder='비밀번호' value={pwd} onChange={handlePwdInput} />
        <input
          type='checkbox'
          id='auto-login'
          checked={isAutoLogin}
          onChange={handleAutoLoginCheckbox}
        />
        <label htmlFor='auto-login'>자동로그인</label>
        <button>로그인</button>
      </form>
      <button onClick={handleRegisterBtn}>회원가입</button>
    </main>
  );
}
