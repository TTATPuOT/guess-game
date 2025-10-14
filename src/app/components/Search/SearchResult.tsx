import { Avatar, Box, Flex, Text } from '@radix-ui/themes'

interface SearchResultProps {
    name: string
    imageUrl: string
    callback: () => void
}

export default function SearchResult({ name, imageUrl, callback }: SearchResultProps) {
    return (
        <Box className="search-result" onClick={callback}>
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
