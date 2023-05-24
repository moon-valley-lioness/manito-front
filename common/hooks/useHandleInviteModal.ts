import { useSetAtom } from 'jotai';
import { inviteModal } from '../state';
import { MouseEventHandler } from 'react';

export default function useHandleInviteModal(groupId: number) {
  const setInviteModal = useSetAtom(inviteModal);

  const handleInviteBtn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInviteModal({
      open: true,
      groupId,
    });
  };

  return { handleInviteBtn };
}
