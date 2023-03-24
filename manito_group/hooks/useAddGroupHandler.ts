import { ChangeEventHandler, useCallback, useState } from 'react';

const useGroupAddHandler = () => {
  const [groupName, setGroupName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxMemberCount, setMaxMemberCount] = useState('');

  const handleGroupNameInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setGroupName(e.target.value);
  }, []);

  const handleStartDateInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setStartDate(e.target.value);
  }, []);

  const handleEndDateInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setEndDate(e.target.value);
  }, []);

  const handleMaxMemberCountInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setMaxMemberCount(e.target.value);
  }, []);

  const clearInputs = useCallback(() => {
    setGroupName('');
    setStartDate('');
    setEndDate('');
    setMaxMemberCount('');
  }, []);

  return {
    groupName,
    startDate,
    endDate,
    maxMemberCount,
    handleGroupNameInput,
    handleStartDateInput,
    handleEndDateInput,
    handleMaxMemberCountInput,
    clearInputs,
  };
};

export default useGroupAddHandler;
