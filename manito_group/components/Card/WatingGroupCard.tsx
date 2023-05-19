import { DeserializedManitoGroup } from '@/manito_group/model';
import manitoGroupStyles from '@/manito_group/styles';
import { useRouter } from 'next/router';
import { MouseEventHandler, useCallback } from 'react';
import styles from '@/common/styles';
import { useSetAtom } from 'jotai';
import { inviteModal } from '@/common/state';

const WatingGroupCard = ({ group }: { group: DeserializedManitoGroup }) => {
  const router = useRouter();
  const setInviteModal = useSetAtom(inviteModal);

  const handleCardClick = useCallback(() => {
    router.push(`groups/${group.id}`);
  }, [router, group]);

  const handleInviteBtn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInviteModal({
      open: true,
      groupId: group.id,
    });
  };

  return (
    <li
      className={`${manitoGroupStyles.groupCard} justify-between items-center`}
      onClick={handleCardClick}
    >
      <div className='flex gap-4'>
        <div className='font-semibold'>{group.name}</div>
        <div className='flex'>
          <div>{new Date(group.startDate).toLocaleDateString('ko-KR')}</div>
          <div>~</div>
          <div>{new Date(group.endDate).toLocaleDateString('ko-KR')}</div>
        </div>
      </div>
      {group.isOwner && (
        <button className={`${styles.button.blue} p-2`} onClick={handleInviteBtn}>
          초대
        </button>
      )}
    </li>
  );
};

export default WatingGroupCard;
