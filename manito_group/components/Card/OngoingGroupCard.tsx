import { DeserializedManitoGroup } from '@/manito_group/model'
import manitoGroupStyles from '@/manito_group/styles'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const OngoingGroupCard = ({ group }: { group: DeserializedManitoGroup }) => {
    const router = useRouter()

    const handleCardClick = useCallback(() => {
        router.push(`groups/${group.id}`)
    }, [router, group])

    return (
        <li className={manitoGroupStyles.groupCard} onClick={handleCardClick}>
            <div className="font-semibold">{group.name}</div>
            <div>{new Date(group.startDate).toLocaleDateString('ko-KR')}</div>
            <div>~</div>
            <div>{new Date(group.endDate).toLocaleDateString('ko-KR')}</div>
        </li>
    )
}

export default OngoingGroupCard
