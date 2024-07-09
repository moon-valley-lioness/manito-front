import { useCallback, useState } from 'react'

/**
 *
 * @param initBool boolean 초기값
 * @returns [boolean값, ture 설정함수, false 설정함수]
 */
const useBooleanFlag = (
    initBool: boolean
): [boolean, () => void, () => void] => {
    const [bool, setBool] = useState(initBool)

    const setTrue = useCallback(() => {
        setBool(true)
    }, [])

    const setFalse = useCallback(() => {
        setBool(false)
    }, [])

    return [bool, setTrue, setFalse]
}

export default useBooleanFlag
