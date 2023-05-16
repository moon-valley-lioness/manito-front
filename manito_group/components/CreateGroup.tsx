import useBooleanFlag from '@/common/hooks/useBooleanFlag';
import { FormEventHandler, useCallback } from 'react';
import Modal from 'react-modal';
import useCreateGroupMutation from '../hooks/useCreateGroupMutation';
import useCreateGroupHandler from '../hooks/useCreateGroupHandler';
import { GroupStatus } from '../model';
import styles from '@/common/styles';
import { groupTab } from '@/common/state';
import { useSetAtom } from 'jotai';
Modal.setAppElement('#__next');

const CreateGroup = () => {
  const [modalOpen, setModalOpen, setModalClose] = useBooleanFlag(false);
  const setGroupTab = useSetAtom(groupTab);

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
    groupMutation.mutate(
      {
        id: null,
        name: groupName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        maxMemberCount: Number(maxMemberCount),
        status: GroupStatus.ONGOING,
      },
      {
        onSuccess() {
          setGroupTab(GroupStatus.WATING);
        },
      }
    );
    handleModalClose();
  };

  return (
    <section className='pl-10 mb-4'>
      <button className={`${styles.button.blue} rounded-lg p-2`} onClick={setModalOpen}>
        그룹 만들기
      </button>
      <Modal
        className='max-w-sm m-auto mt-20 bg-white'
        isOpen={modalOpen}
        onRequestClose={handleModalClose}
      >
        <form className={styles.form} onSubmit={handleGroupAddSubmit}>
          <input
            className={styles.input}
            type='text'
            placeholder='그룹명'
            value={groupName}
            onChange={handleGroupNameInput}
          />
          <input
            className={styles.input}
            type='date'
            placeholder='시작날짜'
            value={startDate}
            onChange={handleStartDateInput}
          />
          <input
            className={styles.input}
            type='date'
            placeholder='종료날짜'
            value={endDate}
            onChange={handleEndDateInput}
          />
          <input
            className={styles.input}
            type='number'
            placeholder='멤버 정원'
            value={maxMemberCount}
            onChange={handleMaxMemberCountInput}
          />
          <button className={styles.button.black}>추가</button>
        </form>
      </Modal>
    </section>
  );
};

export default CreateGroup;
