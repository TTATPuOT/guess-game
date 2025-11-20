import { Box, Card, Flex, TextField } from '@radix-ui/themes'
import SearchResult from '@/app/components/Search/SearchResult'
import useSuggestGame from '@/app/hooks/useSearchGame'
import { ChangeEvent, useCallback, useContext, useMemo, useState } from 'react'
import getIgdbImageUrl, { IgdbImageSize } from '@/app/utils/getIgdbImageUrl'
import SearchLoading from '@/app/components/Search/SearchLoading'
import SearchEmptyResult from '@/app/components/Search/SearchEmptyResult'
import GuessContext from '@/app/contexts/GuessContext'

export default function SearchBar() {
    const { suggestGameCallback, guesses } = useContext(GuessContext)
    const [value, setValue] = useState<string>('')
    const { isLoading, results } = useSuggestGame(value)

    const onChangeCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }, [])

    const onClickCallback = useCallback(
        (id: number) => {
            setValue('')
            suggestGameCallback(id)
        },
        [suggestGameCallback]
    )

    const searchResults = useMemo(() => {
        if (results == null) return

        if (results.length <= 0) return <SearchEmptyResult />

        return results.map((game) => (
            <SearchResult
                name={game.name}
                disabled={guesses.some((g) => g.id === game.id)}
                imageUrl={getIgdbImageUrl(IgdbImageSize.micro, game.cover.image_id)}
                callback={() => onClickCallback(game.id)}
                key={game.id}
            />
        ))
    }, [results, onClickCallback])

    return (
        <Box>
            <Flex gap="3" mb="1">
                <Box flexGrow="1">
                    <TextField.Root
                        tabIndex={1}
                        size="3"
                        placeholder="Game of the day..."
                        onChange={onChangeCallback}
                        value={value}
                    />
                </Box>
            </Flex>

            {(searchResults != null || isLoading) && value.length > 0 && (
                <Box position="relative" style={{ zIndex: 2 }}>
                    <Box position="absolute" width="100%">
                        <Card size="1">
                            <Flex direction="column">
                                {isLoading ? <SearchLoading /> : searchResults}
                            </Flex>
                        </Card>
                    </Box>
                </Box>
            )}
        </Box>
    )
}
