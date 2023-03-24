import useManitoGroupListQuery from '@/manito_group/hooks/useManitoGroupListQuery';

const ManitoGroupList = () => {
  const { data, isLoading, isFetching } = useManitoGroupListQuery();
  return (
    <section className='pl-10'>
      <h2 className='text-xl font-semibold'>마니또 그룹 목록</h2>
      <ul>
        {(isLoading || isFetching) && <li>loading...</li>}
        {data?.map((g) => (
          <li key={g.id}>{g.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default ManitoGroupList;
