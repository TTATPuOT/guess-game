import { Box, Flex, Text } from '@radix-ui/themes'
import Game from '@/app/components/Game'
import { GameMetricCorrect, GameMetricStatus } from '@t/GameData'
import GameBadge from '@/app/components/GameBadge'
import SearchBar from '@/app/components/Search/SearchBar'
import useSuggestGame from '@/app/hooks/useSuggestGame'
import GuessContext from '@/app/contexts/GuessContext'
import { useCallback, useState } from 'react'
import { IgdbGameWithDeveloper } from '@t/IgdbData'

export default function GuessScreen() {
    const { game, isLoading } = useSuggestGame()
    const [guesses, setGuesses] = useState<IgdbGameWithDeveloper[]>([])
    const [suggestGameIsLoading, setSuggestGameIsLoading] = useState<boolean>(false)

    const suggestGameCallback = useCallback(
        async (gameId: number) => {
            setSuggestGameIsLoading(true)
            const game = await fetch(`/api/game/${gameId}`)

            setGuesses([...guesses, await game.json()])
            setSuggestGameIsLoading(false)
        },
        [guesses]
    )

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
                    10 tries left
                </Text>
            </Box>
            <Box>
                <Game
                    name="Kingdom Come: Deliverance"
                    releaseDate={{
                        value: '24 Oct 2025',
                        status: GameMetricStatus.GREATER,
                        correct: GameMetricCorrect.CORRECT
                    }}
                    score={{
                        value: '95',
                        status: GameMetricStatus.LESS,
                        correct: GameMetricCorrect.SIMILAR
                    }}
                    developer={{
                        name: 'Warhorse Studios inc.',
                        country: 'CZ',
                        status: GameMetricStatus.DEFAULT,
                        correct: GameMetricCorrect.DEFAULT
                    }}
                    genres={[
                        { name: 'RPG', status: GameMetricCorrect.CORRECT },
                        { name: 'Action', status: GameMetricCorrect.SIMILAR },
                        { name: 'Simulation', status: GameMetricCorrect.DEFAULT }
                    ]}
                    tags={[
                        { name: 'First-person', status: GameMetricCorrect.DEFAULT },
                        { name: 'Single player', status: GameMetricCorrect.CORRECT }
                    ]}
                    platforms={[
                        { name: 'PC (Microsoft Windows)', status: GameMetricCorrect.DEFAULT },
                        { name: 'PlayStation 5', status: GameMetricCorrect.CORRECT },
                        { name: 'Xbox Series X|S', status: GameMetricCorrect.CORRECT }
                    ]}
                />
            </Box>
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
