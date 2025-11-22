import { Box, Card, Flex, TextField } from '@radix-ui/themes'
import SearchResult from '@/app/components/Search/SearchResult'
import useSuggestGame from '@/app/hooks/useSearchGame'
import { ChangeEvent, useCallback, useContext, useMemo, useState } from 'react'
import getIgdbImageUrl, { IgdbImageSize } from '@/app/utils/getIgdbImageUrl'
import SearchLoading from '@/app/components/Search/SearchLoading'
import SearchEmptyResult from '@/app/components/Search/SearchEmptyResult'
import GuessContext from '@/app/contexts/GuessContext'
import { useEventListener } from 'usehooks-ts'

export default function SearchBar() {
    const { suggestGameCallback, guesses } = useContext(GuessContext)
    const [value, setValue] = useState<string>('')
    const { isLoading, results } = useSuggestGame(value)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)

    const onClickCallback = useCallback(
        (id: number) => {
            setValue('')
            setSelectedIndex(0)
            suggestGameCallback(id)
        },
        [suggestGameCallback]
    )

    const arrowDownCallback = useCallback(
        (e: KeyboardEvent) => {
            const maxIndex = results && (results?.length ?? 0) > 0 ? results.length - 1 : 0

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                if (selectedIndex < maxIndex) {
                    setSelectedIndex(selectedIndex + 1)
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                if (selectedIndex > 0) {
                    setSelectedIndex(selectedIndex - 1)
                }
            } else if (e.code === 'Enter') {
                e.preventDefault()
                if (results && results[selectedIndex]) {
                    onClickCallback(results[selectedIndex].id)
                }
            }
        },
        [selectedIndex, results, onClickCallback]
    )

    useEventListener('keydown', arrowDownCallback)

    const onChangeCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }, [])

    const searchResults = useMemo(() => {
        if (results == null) return

        if (results.length <= 0) return <SearchEmptyResult />

        return results.map((game, index) => (
            <SearchResult
                name={game.name}
                disabled={guesses.some((g) => g.id === game.id)}
                selected={selectedIndex === index}
                imageUrl={getIgdbImageUrl(IgdbImageSize.micro, game.cover.image_id)}
                callback={() => onClickCallback(game.id)}
                key={game.id}
            />
        ))
    }, [results, onClickCallback, selectedIndex])

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
