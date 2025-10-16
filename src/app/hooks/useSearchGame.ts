import { IgdbGame } from '@t/IgdbData'
import { useEffect, useState } from 'react'

export default function useSuggestGame(query: string) {
    const [results, setResults] = useState<IgdbGame[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const handler = setTimeout(async () => {
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

        return () => {
            clearTimeout(handler)
        }
    }, [query])

    return {
        isLoading,
        results
    }
}
