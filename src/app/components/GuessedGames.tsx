import { useContext, useMemo } from 'react'
import GuessContext from '@/app/contexts/GuessContext'
import { Box } from '@radix-ui/themes'
import GameLoading from '@/app/components/GameLoading'
import IgdbGameHoc from '@/app/components/IgdbGameHoc'

export default function GuessedGames() {
    const { guesses, suggestGameIsLoading, game } = useContext(GuessContext)

    const games = useMemo(() => {
        const items = guesses.map((g) => <IgdbGameHoc data={g} key={g.id} />)

        if (suggestGameIsLoading) {
            return [<GameLoading key="loading" />, ...items]
        }

        return items
    }, [guesses, suggestGameIsLoading, game])

    return <Box width="100%">{games}</Box>
}
