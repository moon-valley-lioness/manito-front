import useLoginFormHandler from '@/auth/hooks/useLoginFormHandler';
import { useRouter } from 'next/router';
import { FormEventHandler, useCallback } from 'react';
import { setUserAccessToken, setUserRefreshToken } from '@/user/lib/cookie';

export default function Login() {
  const router = useRouter();
  const { id, pwd, isAutoLogin, handleIdInput, handlePwdInput, handleAutoLoginCheckbox } =
    useLoginFormHandler();

  const handleLogin: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // id, pwd를 서버로 보내 토큰 발급받기

    const accessToken = Math.random();
    const refreshToken = Math.random();
    setUserAccessToken(accessToken);

    if (isAutoLogin) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      setUserRefreshToken(refreshToken, { expires });
    } else {
      setUserRefreshToken(refreshToken);
    }
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
