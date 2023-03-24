import useManitoGroupListQuery from '@/manito_group/hooks/useManitoGroupListQuery';

const ManitoGroupList = () => {
  const { data, isLoading, isFetching } = useManitoGroupListQuery();
  return (
    <ul>
      {(isLoading || isFetching) && <li>loading...</li>}
      {data?.map((g) => (
        <li key={g.id}>{g.name}</li>
      ))}
    </ul>
  );
};

export default ManitoGroupList;
