'use client'

import { Box, Button, Container, Flex, Heading } from '@radix-ui/themes'
import GuessScreen from '@/app/components/GuessScreen'
import { useCallback, useState } from 'react'
import { ym } from 'react-metrika'
import { YANDEX_METRIKA_ID } from '@/app/constatnts'

export default function Home() {
    const [started, setStarted] = useState(false)

    const startCallback = useCallback(() => {
        ym(YANDEX_METRIKA_ID, 'reachGoal', 'start')
        setStarted(true)
    }, [])

    return (
        <Container width="700px" maxWidth="100%" px="5">
            <Flex justify="center" align="center" direction="column">
                {!started && (
                    <Box mt="5">
                        <Heading size="8" as="h1" mb="5" align="center">
                            Only 10 tries to guess the game
                        </Heading>

                        <Heading size="5" as="h1" mb="5" align="center">
                            Will you win?
                        </Heading>

                        <Flex justify="center">
                            <Button size="4" onClick={startCallback}>
                                Play
                            </Button>
                        </Flex>
                    </Box>
                )}
                {started && <GuessScreen />}
            </Flex>
        </Container>
    )
}
