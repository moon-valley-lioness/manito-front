import { useEffect, useState } from 'react'

import { DeserializedManitoGroup, GroupStatus } from '@/manito_group/model'

const statusColorMap = {
    [GroupStatus.WAITING]: 'text-yellow-500',
    [GroupStatus.ONGOING]: 'text-green-500',
    [GroupStatus.ENDED]: 'text-stone-500',
}

export default function DetailHeader({
    groupData,
}: {
    groupData: DeserializedManitoGroup
}) {
    const [date, setDate] = useState<{ startDate: String; endDate: String }>({
        startDate: '',
        endDate: '',
    })

    useEffect(() => {
        setDate({
            startDate: groupData.startDate.toLocaleDateString(),
            endDate: groupData.endDate.toLocaleDateString(),
        })
    }, [groupData])

    return (
        <div className="flex flex-col border-b-2 px-4 py-4 h-[7rem]">
            <div className="font-bold">모임이름: {groupData.name}</div>
            <div className="flex-1 flex flex-col">
                <div className="flex gap-1 font-bold">
                    <label>상태:</label>
                    <div className={statusColorMap[groupData.status]}>
                        {groupData.status}
                    </div>
                </div>
                <div className="flex gap-1">
                    <label className="font-bold">기간:</label>
                    <div>
                        {date.startDate} ~ {date.endDate}
                    </div>
                </div>
            </div>
        </div>
    )
}
