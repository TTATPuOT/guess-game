import { IgdbGameWithDeveloper } from '@t/IgdbData'
import { useEffect, useState } from 'react'
import { ym } from 'react-metrika'
import { YANDEX_METRIKA_ID } from '@/app/constatnts'

export default function useSuggestGame() {
    const [game, setGame] = useState<IgdbGameWithDeveloper | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch('/api/suggest')
            .then((res) => res.json())
            .then((game: IgdbGameWithDeveloper) => {
                setGame(game)
                setIsLoading(false)

                ym(YANDEX_METRIKA_ID, 'reachGoal', 'guessGame', {
                    name: game.name,
                    id: game.id
                })
            })
    }, [])

    return {
        game,
        isLoading
    }
}
