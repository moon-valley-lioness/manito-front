import { useCallback } from 'react';
import { GroupStatus } from '../model';
import { GroupTabStatus } from '@/common/state';

const btnCss = 'bg-slate-50 w-full hover:bg-slate-200';
const activeCss = 'bg-gray-200 w-full';

const GroupListTab = ({
  currentStatus,
  onChangeTab,
}: {
  currentStatus: GroupTabStatus;
  onChangeTab: (status: GroupTabStatus) => void;
}) => {
  const handleWatingClick = useCallback(() => {
    onChangeTab(GroupStatus.WAITING);
  }, [onChangeTab]);

  const handleOngoingClick = useCallback(() => {
    onChangeTab(GroupStatus.ONGOING);
  }, [onChangeTab]);

  const handleEndedClick = useCallback(() => {
    onChangeTab(GroupStatus.ENDED);
  }, [onChangeTab]);

  const handleInvitedClick = useCallback(() => {
    onChangeTab('INVITED');
  }, [onChangeTab]);

  return (
    <section className='flex w-full justify-around px-4 h-10 text-gray-800 mb-4 font-semibold'>
      <button
        type='button'
        className={currentStatus === GroupStatus.ONGOING ? activeCss : btnCss}
        onClick={handleOngoingClick}
      >
        진행중인 그룹
      </button>
      <button
        type='button'
        className={currentStatus === GroupStatus.WAITING ? activeCss : btnCss}
        onClick={handleWatingClick}
      >
        대기중인 그룹
      </button>
      <button
        type='button'
        className={currentStatus === GroupStatus.ENDED ? activeCss : btnCss}
        onClick={handleEndedClick}
      >
        종료된 그룹
      </button>
      <button
        type='button'
        className={currentStatus === 'INVITED' ? activeCss : btnCss}
        onClick={handleInvitedClick}
      >
        초대받은 그룹
      </button>
    </section>
  );
};

export default GroupListTab;
