import { Box, Flex, Text } from '@radix-ui/themes'
import { GameMetricCorrect } from '@t/GameData'
import GameBadge from '@/app/components/GameBadge'
import SearchBar from '@/app/components/Search/SearchBar'
import useSuggestGame from '@/app/hooks/useSuggestGame'
import GuessContext from '@/app/contexts/GuessContext'
import { useCallback, useMemo, useState } from 'react'
import { IgdbGameWithDeveloper } from '@t/IgdbData'
import GuessedGames from '@/app/components/GuessedGames'
import { MAX_TRIES } from '@/app/constatnts'

export default function GuessScreen() {
    const { game } = useSuggestGame()
    const [guesses, setGuesses] = useState<IgdbGameWithDeveloper[]>([])
    const [suggestGameIsLoading, setSuggestGameIsLoading] = useState<boolean>(false)

    const suggestGameCallback = useCallback(
        async (gameId: number) => {
            setSuggestGameIsLoading(true)
            const game = await fetch(`/api/game/${gameId}`)

            setGuesses([await game.json(), ...guesses])
            setSuggestGameIsLoading(false)
        },
        [guesses]
    )

    const triesLeft = useMemo(() => MAX_TRIES - guesses.length, [guesses])

    return (
        <GuessContext.Provider
            value={{
                game,
                guesses,
                suggestGameCallback,
                suggestGameIsLoading,
                tries: 0
            }}>
            <Box py="5" width="100%">
                <Text as="p" size="2" mb="2" color="gray" align="center">
                    Search for an game to make your first guess
                </Text>

                <SearchBar />

                <Text as="p" size="2" mb="5" color="gray" align="center">
                    {triesLeft} tries left
                </Text>
            </Box>

            <GuessedGames />

            <Flex justify="center" align="center" direction="column" pt="2" pb="5">
                <Text mb="2">Use the matching attributes to make more guesses. Good luck!</Text>
                <Flex gap="2">
                    <GameBadge name="Not match" status={GameMetricCorrect.DEFAULT} />
                    <GameBadge name="Close" status={GameMetricCorrect.SIMILAR} />
                    <GameBadge name="Match" status={GameMetricCorrect.CORRECT} />
                </Flex>
            </Flex>
        </GuessContext.Provider>
    )
}
