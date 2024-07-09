import { useSetAtom } from 'jotai'
import { MouseEventHandler } from 'react'

import { inviteModal } from '../state'

export function useHandleInviteModal(groupId: number) {
    const setInviteModal = useSetAtom(inviteModal)

    const handleInviteBtn: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setInviteModal({
            open: true,
            groupId,
        })
    }

    return { handleInviteBtn }
}
