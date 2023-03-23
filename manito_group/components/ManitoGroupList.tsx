import useManitoGroupListQuery from '@/manito_group/hooks/useManitoGroupListQuery';
import { fetchGroupList } from '@/manito_group/lib/fetch';
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
