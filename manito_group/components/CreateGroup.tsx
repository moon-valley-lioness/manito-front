import useBooleanFlag from '@/common/hooks/useBooleanFlag';
import { FormEventHandler, useCallback } from 'react';
import Modal from 'react-modal';
import useCreateGroupMutation from '../hooks/useCreateGroupMutation';
import useCreateGroupHandler from '../hooks/useCreateGroupHandler';

Modal.setAppElement('#__next');

const CreateGroup = () => {
  const [modalOpen, setModalOpen, setModalClose] = useBooleanFlag(false);

  const {
    groupName,
    startDate,
    endDate,
    maxMemberCount,
    handleGroupNameInput,
    handleStartDateInput,
    handleEndDateInput,
    handleMaxMemberCountInput,
    clearInputs,
  } = useCreateGroupHandler();

  const handleModalClose = useCallback(() => {
    clearInputs();
    setModalClose();
  }, [clearInputs, setModalClose]);

  const groupMutation = useCreateGroupMutation();

  const handleGroupAddSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    groupMutation.mutate({
      id: null,
      name: groupName,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      maxMemberCount: Number(maxMemberCount),
    });
    handleModalClose();
  };

  return (
    <section>
      <button onClick={setModalOpen}>ADD</button>
      <Modal isOpen={modalOpen} onRequestClose={handleModalClose}>
        <form onSubmit={handleGroupAddSubmit}>
          <input
            type='text'
            placeholder='그룹명'
            value={groupName}
            onChange={handleGroupNameInput}
          />
          <input
            type='date'
            placeholder='시작날짜'
            value={startDate}
            onChange={handleStartDateInput}
          />
          <input type='date' placeholder='종료날짜' value={endDate} onChange={handleEndDateInput} />
          <input
            type='number'
            placeholder='멤버 정원'
            value={maxMemberCount}
            onChange={handleMaxMemberCountInput}
          />
          <button>추가</button>
        </form>
      </Modal>
    </section>
  );
};

export default CreateGroup;
