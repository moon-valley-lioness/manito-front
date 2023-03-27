import { ManitoGroup } from '@/manito_group/model';
import manitoGroupStyles from '@/manito_group/styles';

const EndedGroupCard = ({ group }: { group: ManitoGroup }) => {
  return (
    <li className={`${manitoGroupStyles.groupCard} bg-gray-50`}>
      <div className='font-semibold'>{group.name}</div>
      <div>{new Date(group.startDate).toLocaleDateString('ko-KR')}</div>
      <div>~</div>
      <div>{new Date(group.endDate).toLocaleDateString('ko-KR')}</div>
    </li>
  );
};

export default EndedGroupCard;
