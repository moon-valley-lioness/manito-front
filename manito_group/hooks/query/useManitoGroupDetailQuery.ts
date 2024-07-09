import { useQuery } from '@tanstack/react-query'
import { MANITO_GROUP_DETAIL } from '@/manito_group/constant/query_key'
import { fetchGroupDetail } from '@/manito_group/lib/fetch'
import { SerializedManitoGroup } from '@/manito_group/model'
import deserializeManitoGroup from '@/manito_group/lib/deserializeManitoGroup'

const fetcher = async (groupId: number) => {
    const data = await fetchGroupDetail(groupId)

    if (!data) return undefined

    return deserializeManitoGroup(data)
}

const useManitoGroupDetailQuery = (
    groupId: number,
    initData?: SerializedManitoGroup
) => {
    return useQuery([MANITO_GROUP_DETAIL, groupId], () => fetcher(groupId), {
        initialData: initData ? deserializeManitoGroup(initData) : undefined,
        refetchOnWindowFocus: false,
    })
}

export default useManitoGroupDetailQuery
