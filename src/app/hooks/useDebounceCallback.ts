import { useEffect } from 'react'

export default function useDebounceCallback(callback: Function, delay: number) {
    useEffect(() => {
        const handler = setTimeout(callback, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [callback, delay])

    return callback
}
