import useManitoGroupListQuery from '@/hooks/useManitoGroupListQuery';
import { fetchGroupList } from '@/lib/manito_group';
import { useEffect, useState } from 'react';

const ManitoGroupList = () => {
  const { data } = useManitoGroupListQuery();
  return (
    <ul>
      {data?.map((g) => (
        <li key={g.id}>{g.name}</li>
      ))}
    </ul>
  );
};

export default ManitoGroupList;
