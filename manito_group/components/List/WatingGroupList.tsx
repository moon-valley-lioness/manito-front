import useManitoGroupListQuery from '@/manito_group/hooks/useManitoGroupListQuery';
import { GroupStatus } from '@/manito_group/model';
import EndedGroupCard from '../Card/EndedGroupCard';
import WatingGroupCard from '../Card/WatingGroupCard';

const WatingGroupList = ({ active }: { active: boolean }) => {
  const { data, isLoading, isFetching } = useManitoGroupListQuery(GroupStatus.WAITING);
  return (
    <section className='px-10' style={{ display: active ? 'block' : 'none' }}>
      <ul>
        {(isLoading || isFetching) && <li>loading...</li>}
        {data?.map((g) => (
          <WatingGroupCard key={g.id} group={g} />
        ))}
      </ul>
    </section>
  );
};

export default WatingGroupList;
