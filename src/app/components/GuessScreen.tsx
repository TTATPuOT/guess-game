import { Box, Button, Flex, Heading, Spinner, Text } from '@radix-ui/themes'
import { GameMetricCorrect } from '@t/GameData'
import GameBadge from '@/app/components/GameBadge'
import SearchBar from '@/app/components/Search/SearchBar'
import useSuggestGame from '@/app/hooks/useSuggestGame'
import GuessContext from '@/app/contexts/GuessContext'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IgdbGameWithDeveloper } from '@t/IgdbData'
import GuessedGames from '@/app/components/GuessedGames'
import { MAX_TRIES, YANDEX_METRIKA_ID } from '@/app/constatnts'
import IgdbGameHoc from '@/app/components/IgdbGameHoc'
import { ym } from 'react-metrika'

export default function GuessScreen() {
    const { game, isLoading } = useSuggestGame()
    const [guesses, setGuesses] = useState<IgdbGameWithDeveloper[]>([])
    const [suggestGameIsLoading, setSuggestGameIsLoading] = useState<boolean>(false)

    const suggestGameCallback = useCallback(
        async (gameId: number) => {
            setSuggestGameIsLoading(true)
            const data = await fetch(`/api/game/${gameId}`)
            const game: IgdbGameWithDeveloper = await data.json()

            setGuesses([game, ...guesses])
            setSuggestGameIsLoading(false)

            ym(YANDEX_METRIKA_ID, 'reachGoal', 'suggestGame', {
                name: game.name,
                id: gameId
            })
        },
        [guesses]
    )

    const triesLeft = useMemo(() => MAX_TRIES - guesses.length, [guesses])

    useEffect(() => {
        if (triesLeft === 0 && game) {
            ym(YANDEX_METRIKA_ID, 'reachGoal', 'lose', {
                name: game.name,
                id: game.id
            })
        }
    }, [triesLeft, game])

    const isGuessedGameSuggested = useMemo(
        () => !!guesses.find((g) => g.id === game?.id),
        [guesses, game?.id]
    )

    useEffect(() => {
        if (isGuessedGameSuggested && game) {
            ym(YANDEX_METRIKA_ID, 'reachGoal', 'win', {
                name: game.name,
                id: game.id,
                try: MAX_TRIES - triesLeft
            })
        }
    }, [isGuessedGameSuggested, game, triesLeft])

    if (isLoading) {
        return (
            <Flex align="center" direction="column">
                <Spinner size="3" />
                <Heading size="3">Now we'll find a game for you...</Heading>
            </Flex>
        )
    }

    return (
        <GuessContext.Provider
            value={{
                game,
                guesses,
                suggestGameCallback,
                suggestGameIsLoading
            }}>
            {triesLeft > 0 && !isGuessedGameSuggested && (
                <Box py="5" width="100%">
                    <Text as="p" size="2" mb="2" color="gray" align="center">
                        Search for an game to make your first guess
                    </Text>

                    <SearchBar />

                    <Text as="p" size="2" mb="5" color="gray" align="center">
                        {triesLeft} tries left
                    </Text>
                </Box>
            )}
            {isGuessedGameSuggested && (
                <Box pb="5" width="100%">
                    <Heading size="8" align="center" color="green">
                        You win in {guesses.length} tries! 🏆
                    </Heading>

                    <Flex pb="5" justify="center">
                        <Button size="4" onClick={() => window.location.reload()}>
                            One more time?
                        </Button>
                    </Flex>
                </Box>
            )}
            {triesLeft <= 0 && !isGuessedGameSuggested && (
                <Box py="5" width="100%">
                    <Heading size="8" align="center" color="red">
                        Unfortunately, you lost :(
                    </Heading>

                    <Heading size="5" mb="5" align="center">
                        The game you couldn't guess:
                    </Heading>

                    {!!game && <IgdbGameHoc data={game} />}

                    <Flex py="5" justify="center">
                        <Button size="4" onClick={() => window.location.reload()}>
                            Try again!
                        </Button>
                    </Flex>
                </Box>
            )}

            <GuessedGames />

            <Flex justify="center" align="center" direction="column" pt="2" pb="5">
                <Text mb="2" align="center">
                    Use the matching attributes to make more guesses. Good luck!
                </Text>
                <Flex gap="2">
                    <GameBadge name="Not match" status={GameMetricCorrect.DEFAULT} />
                    <GameBadge name="Close" status={GameMetricCorrect.SIMILAR} />
                    <GameBadge name="Match" status={GameMetricCorrect.CORRECT} />
                </Flex>
            </Flex>
        </GuessContext.Provider>
    )
}
