import { useAtom } from 'jotai'
import EndedGroupList from './EndedGroupList'
import GroupListTab from './GroupListTab'
import InvitedGroupList from './InvitedGroupList'
import OngoingGroupList from './OngoingGroupList'
import WatingGroupList from './WatingGroupList'

import { GroupStatus } from '@/manito_group/model'
import { groupTab } from '@/manito_group/state'

export default function ManitoGroupList() {
    const [groupListTab, setGroupListTab] = useAtom(groupTab)

    return (
        <>
            <GroupListTab
                currentStatus={groupListTab}
                onChangeTab={setGroupListTab}
            />
            <WatingGroupList active={groupListTab === GroupStatus.WAITING} />
            <OngoingGroupList active={groupListTab === GroupStatus.ONGOING} />
            <EndedGroupList active={groupListTab === GroupStatus.ENDED} />
            <InvitedGroupList active={groupListTab === 'INVITED'} />
        </>
    )
}
