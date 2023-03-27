import useManitoGroupListQuery from '@/manito_group/hooks/useManitoGroupListQuery';
import { GroupStatus } from '@/manito_group/model';
import OngoingGroupCard from '../Card/OngoingGroupCard';

const OngoingGroupList = ({ active }: { active: boolean }) => {
  const { data, isLoading, isFetching } = useManitoGroupListQuery(GroupStatus.ONGOING);
  return (
    <section className='px-10' style={{ display: active ? 'block' : 'none' }}>
      <ul>
        {(isLoading || isFetching) && <li>loading...</li>}
        {data?.map((g) => (
          <OngoingGroupCard key={g.id} group={g} />
        ))}
      </ul>
    </section>
  );
};

export default OngoingGroupList;
