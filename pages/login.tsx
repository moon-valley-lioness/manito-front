import useLoginFormHandler from '@/auth/hooks/useLoginFormHandler';
import { useRouter } from 'next/router';
import { FormEventHandler, useCallback } from 'react';
import { setAuthToken } from '@/auth/lib/cookie';
import { fetchAuthToken } from '@/auth/lib/fetch';

const inputCss = 'rounded border p-1';
const commonBtnCss = 'rounded text-white p-1 font-semibold';

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
    <main className='w-96 m-auto flex flex-col mt-20'>
      <form className='flex flex-col gap-2  mb-2' onSubmit={handleLogin}>
        <input
          className={inputCss}
          type='text'
          placeholder='아이디'
          value={id}
          onChange={handleIdInput}
        />
        <input
          className={inputCss}
          type='password'
          placeholder='비밀번호'
          value={pwd}
          onChange={handlePwdInput}
        />
        <div>
          <input
            className='mr-1'
            type='checkbox'
            id='auto-login'
            checked={isAutoLogin}
            onChange={handleAutoLoginCheckbox}
          />
          <label htmlFor='auto-login'>자동로그인</label>
        </div>
        <button className={`${commonBtnCss} bg-sky-500 hover:bg-sky-400`}>로그인</button>
      </form>
      <button className={`${commonBtnCss} bg-red-700 hover:bg-red-600`} onClick={handleRegisterBtn}>
        회원가입
      </button>
    </main>
  );
}
