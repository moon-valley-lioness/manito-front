import { useCallback } from 'react';
import { GroupStatus } from '../model';

const btnCss = 'bg-slate-50 w-full hover:bg-slate-200';
const activeCss = 'bg-gray-200 w-full';

const GroupListTab = ({
  currentStatus,
  onChangeTab,
}: {
  currentStatus: GroupStatus;
  onChangeTab: (status: GroupStatus) => void;
}) => {
  const handleOngoingClick = useCallback(() => {
    onChangeTab(GroupStatus.ONGOING);
  }, [onChangeTab]);

  const handleEndedClick = useCallback(() => {
    onChangeTab(GroupStatus.ENDED);
  }, [onChangeTab]);

  const handleInvitedClick = useCallback(() => {
    onChangeTab(GroupStatus.INVITED);
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
        className={currentStatus === GroupStatus.ENDED ? activeCss : btnCss}
        onClick={handleEndedClick}
      >
        종료된 그룹
      </button>
      <button
        type='button'
        className={currentStatus === GroupStatus.INVITED ? activeCss : btnCss}
        onClick={handleInvitedClick}
      >
        초대받은 그룹
      </button>
    </section>
  );
};

export default GroupListTab;
