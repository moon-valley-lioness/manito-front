import useBooleanFlag from '@/common/hooks/useBooleanFlag';
import { FormEventHandler, useCallback } from 'react';
import Modal from 'react-modal';
import useCreateGroupMutation from '../hooks/useCreateGroupMutation';
import useCreateGroupHandler from '../hooks/useCreateGroupHandler';
import { GroupStatus } from '../model/manito_group';

Modal.setAppElement('#__next');

const inputCss = 'rounded border p-1';

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
      status: GroupStatus.ONGOING,
    });
    handleModalClose();
  };

  return (
    <section className='w-1/2 pl-10 mb-4'>
      <button
        className='bg-sky-500 rounded-lg p-2 text-white font-semibold hover:bg-sky-600'
        onClick={setModalOpen}
      >
        그룹 만들기
      </button>
      <Modal
        className='w-96 m-auto mt-20 bg-white p-4 rounded border'
        isOpen={modalOpen}
        onRequestClose={handleModalClose}
      >
        <form className='flex flex-col gap-4' onSubmit={handleGroupAddSubmit}>
          <input
            className={inputCss}
            type='text'
            placeholder='그룹명'
            value={groupName}
            onChange={handleGroupNameInput}
          />
          <input
            className={inputCss}
            type='date'
            placeholder='시작날짜'
            value={startDate}
            onChange={handleStartDateInput}
          />
          <input
            className={inputCss}
            type='date'
            placeholder='종료날짜'
            value={endDate}
            onChange={handleEndDateInput}
          />
          <input
            className={inputCss}
            type='number'
            placeholder='멤버 정원'
            value={maxMemberCount}
            onChange={handleMaxMemberCountInput}
          />
          <button className='bg-sky-500 text-white rounded w-1/2 m-auto'>추가</button>
        </form>
      </Modal>
    </section>
  );
};

export default CreateGroup;
