import { DeserializedManitoGroup, GroupStatus } from '@/manito_group/model'

import DetailHeader from './DetailHeader'
import EndedGroupDetail from './EndedGroupDetail'
import OngoingGroupDetail from './OngoingGroupDetail'
import WaitingGroupDetail from './WaitingGroupDetail'

export default function ManitoDetailRoom({
    data,
}: {
    data: DeserializedManitoGroup | undefined
}) {
    function renderContents() {
        if (!data) return <h1>그룹 정보를 가져오지 못했습니다. :(</h1>

        let contents
        switch (data.status) {
            case GroupStatus.WAITING:
                contents = <WaitingGroupDetail groupData={data} />
                break
            case GroupStatus.ONGOING:
                contents = <OngoingGroupDetail groupData={data} />
                break
            case GroupStatus.ENDED:
                contents = <EndedGroupDetail groupData={data} />
                break
            default:
                contents = <h1>error</h1>
        }

        return contents
    }
    return (
        <main
            className={'mt-[3.5rem] flex flex-col'}
            style={{
                height: `calc(100dvh - 3.5rem)`,
            }}
        >
            {data && <DetailHeader groupData={data} />}
            <div
                style={{
                    height: 'calc(100dvh - 10.5rem)',
                }}
            >
                {renderContents()}
            </div>
        </main>
    )
}
