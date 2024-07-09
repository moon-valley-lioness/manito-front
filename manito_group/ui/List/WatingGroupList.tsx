import { useManitoGroupListQuery } from '@/manito_group/hooks'
import { GroupStatus } from '@/manito_group/model'

import WatingGroupCard from '../Card/WatingGroupCard'
import InvitePeaple from '../InvitePeople'

const WatingGroupList = ({ active }: { active: boolean }) => {
    const { data, isLoading, isFetching } = useManitoGroupListQuery(
        GroupStatus.WAITING
    )
    return (
        <section
            className="px-4"
            style={{ display: active ? 'block' : 'none' }}
        >
            <ul>
                {(isLoading || isFetching) && <li>loading...</li>}
                {data?.map((g) => <WatingGroupCard key={g.id} group={g} />)}
            </ul>
            <InvitePeaple />
        </section>
    )
}

export default WatingGroupList
