import useManitoGroupListQuery from '@/manito_group/hooks/useManitoGroupListQuery';
import { GroupStatus } from '@/manito_group/model';
import InvitedGroupCard from '../Card/InvitedGroupCard';

const InvitedGroupList = ({ active }: { active: boolean }) => {
  const { data, isLoading, isFetching } = useManitoGroupListQuery(GroupStatus.INVITED);
  return (
    <section className='px-10' style={{ display: active ? 'block' : 'none' }}>
      <ul>
        {(isLoading || isFetching) && <li>loading...</li>}
        {data?.map((g) => (
          <InvitedGroupCard key={g.id} group={g} />
        ))}
      </ul>
    </section>
  );
};

export default InvitedGroupList;
