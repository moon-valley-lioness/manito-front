import styles from '@/common/styles';
import { ManitoGroup } from '@/manito_group/model';
import manitoGroupStyles from '@/manito_group/styles';

const InvitedGroupCard = ({ group }: { group: ManitoGroup }) => {
  return (
    <li className={`${manitoGroupStyles.groupCard} justify-between`}>
      <div className='font-semibold'>{group.name}</div>
      <div className='flex gap-4'>
        <button className={styles.button.blue}>승인</button>
        <button className={styles.button.red}>거절</button>
      </div>
    </li>
  );
};

export default InvitedGroupCard;
