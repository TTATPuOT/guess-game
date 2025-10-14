"use client";

import {Box, Button, Container, Flex, Heading, Text, TextField} from "@radix-ui/themes";
import GuessScreen from "@/app/components/GuessScreen";
import {useCallback, useState} from "react";

export default function Home() {
    const [started, setStarted] = useState(false)

    const startCallback = useCallback(() => {
        setStarted(true)
    }, [])

    return <Container width="700px">
        <Flex justify="center" align="center" direction="column">
            {!started && <Box mt="5">
                <Heading size="8" as="h1" mb="5" align="center">
                    Only 10 tries to guess the game
                </Heading>

                <Heading size="5" as="h1" mb="5" align="center">
                    Will you win?
                </Heading>

                <Flex justify="center">
                    <Button size="4" onClick={startCallback}>Play</Button>
                </Flex>
            </Box>}
            {started && <GuessScreen />}
        </Flex>
    </Container>;
}
