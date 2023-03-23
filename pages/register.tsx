import useLoginFormHandler from '@/auth/hooks/useLoginFormHandler';
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
    <main>
      <form onSubmit={handleRegister}>
        <input type='text' placeholder='아이디' value={id} onChange={handleIdInput} />
        <input type='password' placeholder='비밀번호' value={pwd} onChange={handlePwdInput} />
        <input
          type='password'
          placeholder='비밀번호 확인'
          value={confirmPwd}
          onChange={handleConfirmPwdInput}
        />
        <button>회원가입</button>
      </form>
    </main>
  );
}
