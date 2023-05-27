import useLoginFormHandler from '@/auth/hooks/useLoginFormHandler';
import { useRouter } from 'next/router';
import { FormEventHandler, useCallback } from 'react';
import { setAuthToken } from '@/auth/lib/cookie';
import { fetchAuthToken } from '@/auth/lib/fetch';
import styles from '@/common/styles';

export default function Login() {
  const router = useRouter();
  const { id, pwd, isAutoLogin, handleIdInput, handlePwdInput, handleAutoLoginCheckbox } =
    useLoginFormHandler();

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (id.trim().length === 0 || pwd.trim().length === 0) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const jwt = await fetchAuthToken({ id, password: pwd });
      if (!jwt) {
        throw Error('로그인에 실패했습니다.');
      }
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
    <section className='min-h-screen flex flex-col grow'>
      <main className='flex flex-col grow order-4 items-stretch'>
        <article className='w-full flex grow justify-center'>
          <div className='max-w-sm flex flex-col grow justify-center'>
            <form className={`${styles.form} mb-4`} onSubmit={handleLogin}>
              <input
                className={styles.input}
                type='text'
                placeholder='아이디'
                value={id}
                onChange={handleIdInput}
              />
              <input
                className={styles.input}
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
              <button type='submit' className={styles.button.black}>
                로그인
              </button>
            </form>
            <div className='border p-5'>
              <button
                type='button'
                className={`${styles.button.red} w-full`}
                onClick={handleRegisterBtn}
              >
                회원가입
              </button>
            </div>
          </div>
        </article>
      </main>
      <footer className='flex order-5 px-6'>
        <div className='mb-12'>footer</div>
      </footer>
    </section>
  );
}
