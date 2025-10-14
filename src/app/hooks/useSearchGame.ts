import { IgdbGame } from '@t/IgdbData'
import { useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

export default function useSuggestGame() {
    const [results, setResults] = useState<IgdbGame[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const inputCallback = useDebounceCallback(async (query: string) => {
        if (query.length < 4) {
            setResults([])
            return
        }

        setIsLoading(true)

        const q = new URLSearchParams({ query })

        const data = await fetch('/api/search?' + q.toString())
        setResults(await data.json())

        setIsLoading(false)
    }, 700)

    return {
        inputCallback,
        isLoading,
        results
    }
}
