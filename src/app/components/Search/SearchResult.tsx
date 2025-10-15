import { Avatar, Box, Flex, Text } from '@radix-ui/themes'

interface SearchResultProps {
    name: string
    imageUrl: string
    disabled: boolean
    callback: () => void
}

export default function SearchResult({ name, imageUrl, callback, disabled }: SearchResultProps) {
    return (
        <Box
            className={!disabled ? 'search-result' : 'search-result-disabled'}
            onClick={!disabled ? callback : () => {}}>
            <Flex gap="3" align="center" p="2">
                <Avatar size="2" src={imageUrl} fallback={name} />
                <Box>
                    <Text as="div" size="4" weight="bold">
                        {name}
                    </Text>
                </Box>
            </Flex>
        </Box>
    )
}
