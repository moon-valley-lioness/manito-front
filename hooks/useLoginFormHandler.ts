import { ChangeEventHandler, useCallback, useState } from 'react';

const useLoginFormHandler = () => {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const handleIdInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const handlePwdInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setPwd(e.target.value);
  }, []);

  const handleConfirmPwdInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setConfirmPwd(e.target.value);
  }, []);

  const handleAutoLoginCheckbox: ChangeEventHandler<HTMLInputElement> = useCallback(() => {
    setIsAutoLogin((prev) => !prev);
  }, []);

  return {
    id,
    pwd,
    confirmPwd,
    isAutoLogin,
    handleIdInput,
    handlePwdInput,
    handleConfirmPwdInput,
    handleAutoLoginCheckbox,
  };
};

export default useLoginFormHandler;
