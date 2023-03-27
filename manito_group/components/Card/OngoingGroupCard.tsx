import { ManitoGroup } from '@/manito_group/model';
import manitoGroupStyles from '@/manito_group/styles';

const OngoingGroupCard = ({ group }: { group: ManitoGroup }) => {
  return (
    <li className={manitoGroupStyles.groupCard}>
      <div className='font-semibold'>{group.name}</div>
      <div>{new Date(group.startDate).toLocaleDateString('ko-KR')}</div>
      <div>~</div>
      <div>{new Date(group.endDate).toLocaleDateString('ko-KR')}</div>
    </li>
  );
};

export default OngoingGroupCard;
