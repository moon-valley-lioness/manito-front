import { useHandleInviteModal } from '@/manito_group/hooks'
import styles from '@/common/styles'
import {
    useStartGroupMutation,
    useInviteDetailQuery,
} from '@/manito_group/hooks'

import { DeserializedManitoGroup, InviteStatus } from '@/manito_group/model'
import manitoGroupStyles from '@/manito_group/styles'
import InvitePeaple from '../InvitePeople'

const inviteStatusColorMap = {
    [InviteStatus.ACCEPT]: 'text-green-500',
    [InviteStatus.PENDING]: 'text-black',
    [InviteStatus.REJECT]: 'text-red-500',
}

export default function WaitingGroupDetail({
    groupData,
}: {
    groupData: DeserializedManitoGroup
}) {
    const mutaiton = useStartGroupMutation()
    const { data: invitedetails } = useInviteDetailQuery(groupData.id)
    const { handleInviteBtn } = useHandleInviteModal(groupData.id)

    const handleStart = () => {
        if (groupData.currentMemberCount < 4) {
            alert('최소 4명의 인원이 필요합니다.')
            return
        }
        mutaiton.mutate(
            { groupId: groupData.id },
            {
                onError() {
                    alert(
                        '그룹 시작에 실패했습니다 - 잠시 후 다시 시도해주세요.'
                    )
                },
            }
        )
    }

    return (
        <>
            <section>
                <div className={manitoGroupStyles.card}>
                    <div>
                        정원: {groupData.currentMemberCount} /{' '}
                        {groupData.maxMemberCount}
                    </div>
                    <div className="mt-4 font-bold">
                        호스트: {groupData.ownerName}
                    </div>
                    <div className="font-bold mt-4">초대 받은 사람들</div>
                    <div className="grid grid-cols-2 mt-2 gap-4">
                        {invitedetails && invitedetails.length > 0 ? (
                            invitedetails.map((detail) => (
                                <InvitedPeople
                                    key={detail.name}
                                    name={detail.name}
                                    status={detail.status}
                                />
                            ))
                        ) : (
                            <div className="col-span-2 text-center">
                                초대받은 사람들이 없습니다.
                            </div>
                        )}
                    </div>
                    <h2 className="py-4 font-bold text-orange-400">
                        그룹 시작 전입니다.
                    </h2>
                    {groupData.isOwner && (
                        <div className="flex gap-4 mt-4">
                            <button
                                className={`${styles.button.blue} py-2 px-4`}
                                onClick={handleStart}
                            >
                                시작
                            </button>
                            <button
                                className={`${styles.button.green} py-2 px-4`}
                                onClick={handleInviteBtn}
                            >
                                초대
                            </button>
                        </div>
                    )}
                </div>
            </section>
            <InvitePeaple />
        </>
    )
}

function InvitedPeople({
    name,
    status,
}: {
    name: string
    status: InviteStatus
}) {
    return (
        <div className="group flex relative">
            <div
                data-tooltip-target="tooltip-default"
                className={`${inviteStatusColorMap[status]} text-md px-5 py-2.5 text-center`}
            >
                {name}
            </div>
            <div
                id="tooltip-default"
                role="tooltip"
                className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
        -translate-x-1/2 -translate-y-full -top-2 opacity-0 m-4 mx-auto"
            >
                {status}
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
        </div>
    )
}
