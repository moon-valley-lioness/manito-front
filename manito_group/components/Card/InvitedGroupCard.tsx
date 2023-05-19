import styles from '@/common/styles';
import useInviteAnswerMutation from '@/manito_group/hooks/mutation/useInviteAnswerMutation';
import { DeserializedManitoGroup } from '@/manito_group/model';
import manitoGroupStyles from '@/manito_group/styles';

const InvitedGroupCard = ({ group }: { group: DeserializedManitoGroup }) => {
  const mutation = useInviteAnswerMutation();

  const handleJoin = () => {
    mutation.mutate(
      {
        groupId: group.id,
        isAccept: true,
      },
      {
        onSuccess() {
          alert('그룹에 참여했습니다.');
        },
        onError() {
          alert('참여에 실패했습니다 - 잠시 후 다시 시도해주세요');
        },
      }
    );
  };
  const handleReject = () => {
    mutation.mutate(
      {
        groupId: group.id,
        isAccept: false,
      },
      {
        onSuccess() {
          alert('그룹 참여를 거절했습니다.');
        },
        onError() {
          alert('거절에 실패했습니다 - 잠시 후 다시 시도해주세요');
        },
      }
    );
  };

  return (
    <li className={`${manitoGroupStyles.groupCard} justify-between`}>
      <div className='font-semibold'>{group.name}</div>
      <div className='flex gap-4'>
        <button className={styles.button.blue} onClick={handleJoin}>
          승인
        </button>
        <button className={styles.button.red} onClick={handleReject}>
          거절
        </button>
      </div>
    </li>
  );
};

export default InvitedGroupCard;
