import useLoginFormHandler from '@/auth/hooks/useLoginFormHandler';
import styles from '@/common/styles';
import { createUser } from '@/user/lib/fetch';
import { useRouter } from 'next/router';
import { FormEventHandler } from 'react';

export default function Register() {
  const router = useRouter();
  const { id, pwd, confirmPwd, handleIdInput, handlePwdInput, handleConfirmPwdInput } =
    useLoginFormHandler();

  const handleRegister: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (id.trim().length === 0 || pwd.trim().length === 0) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    if (pwd !== confirmPwd) {
      return;
    }
    try {
      const res = await createUser({ id, password: pwd });
      if (res.isSuccess) {
        router.push('/login');
      } else {
        alert(res.errMsg);
      }
    } catch (e) {
      alert('회원가입에 실패했습니다.');
    }
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
