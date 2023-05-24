import styles from '@/common/styles';
import useStartGroupMutation from '@/manito_group/hooks/mutation/useStartGroupMutation';
import { DeserializedManitoGroup } from '@/manito_group/model';
import manitoGroupStyles from '@/manito_group/styles';

export default function WaitingGroupDetail({ groupData }: { groupData: DeserializedManitoGroup }) {
  const mutaiton = useStartGroupMutation();

  const handleStart = () => {
    // if (data?.currentMemberCount && data.currentMemberCount < 4) {
    //   alert('최소 4명의 인원이 필요합니다.');
    //   return;
    // }
    mutaiton.mutate(
      { groupId: groupData.id },
      {
        onError() {
          alert('그룹 시작에 실패했습니다 - 잠시 후 다시 시도해주세요.');
        },
      }
    );
  };

  return (
    <section>
      <div className={manitoGroupStyles.card}>
        <div>
          정원: {groupData.currentMemberCount} / {groupData.maxMemberCount}
        </div>
        <h2 className='py-4'>그룹 시작 전입니다.</h2>
        {groupData.isOwner && (
          <button className={`${styles.button.blue} py-2 px-4 mt-4`} onClick={handleStart}>
            시작
          </button>
        )}
      </div>
    </section>
  );
}
