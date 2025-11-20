import { Box, Card, Flex, Heading, Text, Tooltip } from '@radix-ui/themes'
import Flag from 'react-world-flags'
import { GameMetricCorrect } from '@t/GameData'
import GameBadge from '@/app/components/GameBadge'
import useSummary from '@/app/hooks/useSummary'
import { useContext, useMemo } from 'react'
import GuessContext from '@/app/contexts/GuessContext'

export default function Summary() {
    const { guesses } = useContext(GuessContext)
    const { year, criticsScore, developer, labels } = useSummary()

    const notFromCountries = useMemo(
        () =>
            developer.excludedCountries.map((i) => (
                <Tooltip key={i.slug} content={i.name}>
                    <Flag code={i.slug} style={{ width: 20 }} />
                </Tooltip>
            )),
        [developer.excludedCountries]
    )

    const platforms = useMemo(
        () =>
            labels.platforms.map((i) => (
                <GameBadge key={i} name={i} size="3" status={GameMetricCorrect.CORRECT} />
            )),
        [labels.platforms]
    )

    const genres = useMemo(
        () =>
            labels.genres.map((i) => (
                <GameBadge key={i} name={i} size="3" status={GameMetricCorrect.CORRECT} />
            )),
        [labels.genres]
    )

    const tags = useMemo(
        () =>
            labels.tags.map((i) => (
                <GameBadge key={i} name={i} size="3" status={GameMetricCorrect.CORRECT} />
            )),
        [labels.tags]
    )

    if (guesses.length <= 0) return null

    return (
        <>
            <Heading mt="0" size="5">
                Summary ✨
            </Heading>
            <Card size="2" mb="5">
                <Flex gap="3" align="start" justify="start">
                    <Box minWidth="130px">
                        <Box>
                            <Text as="div" size="3" color="gray">
                                Release Year
                            </Text>
                            {!!year.correct && (
                                <Text
                                    as="div"
                                    size="4"
                                    weight="bold"
                                    wrap="nowrap"
                                    color={GameMetricCorrect.CORRECT}>
                                    {year.correct}
                                </Text>
                            )}
                            {!year.correct && (
                                <Text as="div" size="4" weight="bold" wrap="nowrap">
                                    {year.min ?? '?'} - {year.max ?? '?'}
                                </Text>
                            )}
                        </Box>
                        <Box mt="1">
                            <Text as="div" size="3" color="gray">
                                Critic's&nbsp;score
                            </Text>
                            {!!criticsScore.correct && (
                                <Text
                                    as="div"
                                    size="4"
                                    weight="bold"
                                    wrap="nowrap"
                                    color={GameMetricCorrect.CORRECT}>
                                    {criticsScore.correct}
                                </Text>
                            )}
                            {!criticsScore.correct && (
                                <Text as="div" size="4" weight="bold" wrap="nowrap">
                                    {criticsScore.min ?? '?'} - {criticsScore.max ?? '?'}
                                </Text>
                            )}
                        </Box>
                        <Box mt="1">
                            {(!!developer.correct.developerName || !!developer.correct.country) && (
                                <>
                                    <Text as="div" size="3" color="gray">
                                        Developer {!developer.correct.developerName && ' from'}
                                    </Text>
                                    {!!developer.correct.developerName && (
                                        <Text as="div" size="2" weight="bold">
                                            {developer.correct.developerName}
                                        </Text>
                                    )}
                                    {!!developer.correct.country && (
                                        <Tooltip content={developer.correct.country.name}>
                                            <Flag
                                                code={developer.correct.country.slug}
                                                style={{ width: 20 }}
                                            />
                                        </Tooltip>
                                    )}
                                </>
                            )}
                            {!developer.correct.developerName &&
                                !developer.correct.country &&
                                developer.excludedCountries.length > 0 && (
                                    <>
                                        <Text as="div" size="3" color="red">
                                            Developer not from
                                        </Text>
                                        <Flex gap="1" align="center" justify="start" wrap="wrap">
                                            {notFromCountries}
                                        </Flex>
                                    </>
                                )}
                        </Box>
                    </Box>
                    <Box maxWidth="calc(100% - 130px)">
                        <Flex direction="column" gapY="2">
                            {genres.length > 0 && (
                                <Flex gap="2" wrap="wrap">
                                    {genres}
                                </Flex>
                            )}
                            {tags.length > 0 && (
                                <Flex gap="2" wrap="wrap">
                                    {tags}
                                </Flex>
                            )}
                            {platforms.length > 0 && (
                                <Flex gap="2" wrap="wrap">
                                    {platforms}
                                </Flex>
                            )}
                        </Flex>
                    </Box>
                </Flex>
            </Card>
        </>
    )
}
