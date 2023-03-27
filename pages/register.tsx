import useLoginFormHandler from '@/auth/hooks/useLoginFormHandler';
import styles from '@/common/styles';
import { useRouter } from 'next/router';
import { FormEventHandler } from 'react';

export default function Register() {
  const router = useRouter();
  const { id, pwd, confirmPwd, handleIdInput, handlePwdInput, handleConfirmPwdInput } =
    useLoginFormHandler();

  const handleRegister: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (pwd !== confirmPwd) {
      return;
    }

    // id, pwd 서버로 보내기
    // id 중복되었다면 err msg 띄우기

    router.push('/login');
  };

  return (
    <section className='min-h-screen flex flex-col grow'>
      <main className='flex flex-col grow order-4 items-stretch'>
        <article className='w-full flex grow justify-center'>
          <div className='max-w-sm flex flex-col grow justify-center'>
            <form className={styles.form} onSubmit={handleRegister}>
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
              <input
                className={styles.input}
                type='password'
                placeholder='비밀번호 확인'
                value={confirmPwd}
                onChange={handleConfirmPwdInput}
              />
              <button className={styles.button.black} type='submit'>
                회원가입
              </button>
            </form>
          </div>
        </article>
      </main>
      <footer className='flex order-5 px-6'>
        <div className='mb-12'>footer</div>
      </footer>
    </section>
  );
}
