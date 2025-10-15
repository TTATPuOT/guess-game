import { Card, Flex, Spinner } from '@radix-ui/themes'

export default function GameLoading() {
    return (
        <Card size="3" mb="5">
            <Flex justify="center">
                <Spinner size="3" />
            </Flex>
        </Card>
    )
}
