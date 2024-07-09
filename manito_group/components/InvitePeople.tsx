import { inviteModal } from '@/common/state'
import styles from '@/common/styles'
import { useAtom } from 'jotai'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import ReactModal from 'react-modal'
import useInviteGroupMutation from '@/manito_group/hooks/mutation/useInviteGroupMutation'

ReactModal.setAppElement('#__next')

export default function InvitePeaple() {
    const [{ open, groupId }, setInviteModal] = useAtom(inviteModal)
    const mutation = useInviteGroupMutation()
    const [guestId, setGuestId] = useState('')

    const handleModalClose = () => {
        setInviteModal({ groupId: undefined, open: false })
    }

    const handleUserIdInputChange: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setGuestId(e.target.value)
    }

    const handleInviteSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if (guestId === '') {
            alert('유저 아이디를 입력해주세요.')
            return
        }

        if (groupId && guestId) {
            mutation.mutate(
                { groupId, guestId },
                {
                    onSuccess() {
                        alert('초대 성공!')
                        setGuestId('')
                        handleModalClose()
                    },
                    onError() {
                        alert('유저 초대 실패 - 잠시 후 다시 시도해주세요.')
                    },
                }
            )
        }
    }

    return (
        <ReactModal
            className="max-w-sm m-auto mt-20 bg-white"
            isOpen={open}
            onRequestClose={handleModalClose}
        >
            <form
                className={`${styles.form} p-8`}
                onSubmit={handleInviteSubmit}
            >
                <input
                    className={styles.input}
                    type="text"
                    placeholder="유저 아이디"
                    value={guestId}
                    onChange={handleUserIdInputChange}
                />
                <button className={styles.button.black}>초대보내기</button>
            </form>
        </ReactModal>
    )
}
