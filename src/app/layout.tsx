import type { Metadata } from 'next'
import React from 'react'
import { Theme, Flex, Box, Heading, Container, Separator, Link, Text } from '@radix-ui/themes'
import Metrika from '@/app/components/Metrika'
import { MAX_TRIES } from '@/app/constatnts'
import Seo from '@/app/components/Seo'
import 'normalize.css'
import '@radix-ui/themes/styles.css'
import './globals.css'

export const metadata: Metadata = {
    title: 'Guess Game',
    description: `Try to guess the game based on indirect signs in ${MAX_TRIES} attempts!`,
    icons: {
        icon: '/favicon.png'
    }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <Seo />
                <Theme appearance="dark">
                    <Flex direction="column" gap="2">
                        <Box minHeight="100vh" pb="40px">
                            <Box position="sticky" pb="5">
                                <Container>
                                    <Flex gap="3" justify="between">
                                        <Box flexGrow="1" py="3">
                                            <Heading m="0" size="6" align="center">
                                                Guess Game
                                            </Heading>
                                            <Heading m="0" size="1" align="center">
                                                by{' '}
                                                <Link
                                                    href="https://patriotovsky.ru/"
                                                    target="_blank"
                                                    rel="noopener noreferrer">
                                                    @patriotovsky
                                                </Link>
                                            </Heading>
                                        </Box>
                                    </Flex>
                                </Container>
                                <Separator size="4" />
                            </Box>
                            {children}
                        </Box>
                        <Box style={{ marginTop: -50 }}>
                            <Container py="1">
                                <Flex align="center" direction="column">
                                    <Text align="center" size="1" color="gray">
                                        Based on{' '}
                                        <Link
                                            href="https://www.igdb.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            color="gray"
                                            underline="always">
                                            IGDB's
                                        </Link>{' '}
                                        data
                                    </Text>
                                    <Text size="1" color="gray" align="center">
                                        All trademarks, logos and brand names are the property of
                                        their respective owners.
                                    </Text>
                                </Flex>
                            </Container>
                        </Box>
                    </Flex>
                </Theme>
                <Metrika />
            </body>
        </html>
    )
}
