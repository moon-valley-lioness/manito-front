import { useQuery } from '@tanstack/react-query'

import { MANITO_GROUP_LIST_QUERY_KEY } from '@/manito_group/constant/query_key'
import { fetchGroupList } from '@/manito_group/lib/fetch'
import { GroupStatus } from '@/manito_group/model'

export const useManitoGroupListQuery = (status: GroupStatus) => {
    return useQuery({
        queryKey: [MANITO_GROUP_LIST_QUERY_KEY, status],
        queryFn: () => fetchGroupList(status),
        refetchOnWindowFocus: false,
    })
}
