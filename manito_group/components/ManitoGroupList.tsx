import useManitoGroupListQuery from '@/manito_group/hooks/useManitoGroupListQuery';

const ManitoGroupList = () => {
  const { data, isLoading } = useManitoGroupListQuery();
  return (
    <ul>
      {isLoading ?? <li>loading...</li>}
      {data?.map((g) => (
        <li key={g.id}>{g.name}</li>
      ))}
    </ul>
  );
};

export default ManitoGroupList;
