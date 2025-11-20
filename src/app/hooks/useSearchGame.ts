import { IgdbGame } from '@t/IgdbData'
import { useContext, useEffect, useState } from 'react'
import GuessContext from '@/app/contexts/GuessContext'

export default function useSuggestGame(query: string) {
    const { guesses } = useContext(GuessContext)

    const [results, setResults] = useState<IgdbGame[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (query.length < 4) {
                setResults([])
                return
            }

            setIsLoading(true)

            const excludedGameIds = guesses.map((i) => i.id).join(',')

            const q = new URLSearchParams({ query, excluded_ids: excludedGameIds })

            const data = await fetch('/api/search?' + q.toString())
            setResults(await data.json())

            setIsLoading(false)
        }, 700)

        return () => {
            clearTimeout(handler)
        }
    }, [query, guesses])

    return {
        isLoading,
        results
    }
}
