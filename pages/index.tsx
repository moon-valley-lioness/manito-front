import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { USER_INFO_QUERY_KEY } from '@/user/constant/query_key';
import { fetchUserInfo } from '@/user/lib/fetch';
import Header from '@/common/components/Header';
import { getAccessTokenAnyway } from '@/auth/lib/jwt';
import CreateGroup from '@/manito_group/components/CreateGroup';
import { GroupStatus } from '@/manito_group/model';
import { useState } from 'react';
import EndedGroupList from '@/manito_group/components/List/EndedGroupList';
import InvitedGroupList from '@/manito_group/components/List/InvitedGroupList';
import OngoingGroupList from '@/manito_group/components/List/OngoingGroupList';

import GroupListTab from '@/manito_group/components/GroupListTab';
import WatingGroupList from '@/manito_group/components/List/WatingGroupList';
import { groupTab } from '@/common/state';
import { useAtom } from 'jotai';

const Home: NextPage = () => {
  const [groupListTab, setGroupListTab] = useAtom(groupTab);

  return (
    <>
      <Head>
        <title>Manito</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='pt-20'>
        <CreateGroup />
        <GroupListTab currentStatus={groupListTab} onChangeTab={setGroupListTab} />
        <WatingGroupList active={groupListTab === GroupStatus.WATING} />
        <OngoingGroupList active={groupListTab === GroupStatus.ONGOING} />
        <EndedGroupList active={groupListTab === GroupStatus.ENDED} />
        <InvitedGroupList active={groupListTab === GroupStatus.INVITED} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const accessToken = await getAccessTokenAnyway({ req, res });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([USER_INFO_QUERY_KEY], () => fetchUserInfo(accessToken));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default Home;
