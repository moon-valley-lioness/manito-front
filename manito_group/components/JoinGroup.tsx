import { ChangeEventHandler, FormEventHandler, useCallback, useState } from 'react';
import Modal from 'react-modal';
import useJoinGroupMutation from '../hooks/useJoinGroupMutation';

Modal.setAppElement('#__next');

const JoinGroup = () => {
  const [groupId, setGroupId] = useState('');

  const handleGroupIdInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setGroupId(e.target.value);
  }, []);

  const joinGroupMutation = useJoinGroupMutation();

  const handleJoinGroupSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    joinGroupMutation.mutate(groupId);
    setGroupId('');
  };

  return (
    <section>
      <form onSubmit={handleJoinGroupSubmit}>
        <input type='text' placeholder='group id' value={groupId} onChange={handleGroupIdInput} />
        <button>JOIN</button>
      </form>
    </section>
  );
};

export default JoinGroup;
