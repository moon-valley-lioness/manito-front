import styles from '@/common/styles';
import { DeserializedManitoGroup } from '@/manito_group/model';
import manitoGroupStyles from '@/manito_group/styles';

const InvitedGroupCard = ({ group }: { group: DeserializedManitoGroup }) => {
  const handleJoin = () => {};
  const handleReject = () => {};

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
