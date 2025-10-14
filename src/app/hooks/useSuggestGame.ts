import { IgdbGameWithDeveloper } from '@t/IgdbData'
import { useEffect, useState } from 'react'

export default function useSuggestGame() {
    const [game, setGame] = useState<IgdbGameWithDeveloper | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch('/api/suggest')
            .then((res) => res.json())
            .then((json) => {
                setGame(json)
                setIsLoading(false)
            })
    }, [])

    return {
        game,
        isLoading
    }
}
