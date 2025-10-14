import { Box, Flex, Text } from '@radix-ui/themes'

export default function SearchEmptyResult() {
    return (
        <Box>
            <Flex gap="3" align="center" justify="center" p="2">
                <Text as="div" size="4" weight="bold">
                    Can't found any game, sorry
                </Text>
            </Flex>
        </Box>
    )
}
