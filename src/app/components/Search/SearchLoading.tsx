import { Box, Flex, Spinner, Text } from '@radix-ui/themes'

export default function SearchLoading() {
    return (
        <Box>
            <Flex gap="3" align="center" justify="center" p="2">
                <Spinner size="3" />
                <Text as="div" size="4" weight="bold">
                    Loading...
                </Text>
            </Flex>
        </Box>
    )
}
