import { Box, Card, Flex, Grid, Heading, Inset, Text, Tooltip } from '@radix-ui/themes'
import { GameData } from '@t/GameData'
import StatusArrow from '@/app/components/StatusArrow'
import Flag from 'react-world-flags'
import { useMemo } from 'react'
import GameBadge from '@/app/components/GameBadge'
import sortGameTags from '@/app/utils/sortGameTags'
import { getCountryData, TCountryCode } from 'countries-list'
import winImg from '@/app/icons/win.svg'
import igdbLogo from '@/app/icons/igdb.svg'
import Image from 'next/image'
import Confetti from 'react-confetti-boom'
import Link from 'next/link'

interface GameProps extends GameData {
    winner: boolean
}

export default function Game({
    name,
    image,
    link,
    releaseDate,
    developer,
    score,
    genres,
    tags,
    platforms,
    winner
}: GameProps) {
    const genresElements = useMemo(() => {
        return genres
            .sort(sortGameTags)
            .map((genre, index) => <GameBadge key={index + name} {...genre} />)
    }, [genres])

    const tagsElements = useMemo(() => {
        return tags
            .sort(sortGameTags)
            .map((genre, index) => <GameBadge key={index + name} {...genre} />)
    }, [tags])

    const platformsElements = useMemo(() => {
        return platforms
            .sort(sortGameTags)
            .map((genre, index) => <GameBadge key={index + name} {...genre} />)
    }, [platforms])

    const countryName = useMemo(
        () => getCountryData(developer.country as TCountryCode)?.name,
        [developer.country]
    )

    return (
        <Card size="2" mb="5">
            {winner && <Confetti particleCount={50} mode="boom" />}
            <Flex>
                <Inset
                    clip="border-box"
                    side="left"
                    mr="3"
                    style={{ minWidth: 190, maxWidth: 190 }}
                    className="hidden md:block">
                    <img
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'var(--gray-5)'
                        }}
                        src={image}
                        alt={name}
                    />
                </Inset>
                <Box width="100%">
                    <Flex>
                        <Heading as="h3" size="5" trim="start" mb="4" wrap="pretty">
                            <span style={{ display: 'inline-block', marginRight: 10 }}>{name}</span>
                            <Link href={link} target="_blank" rel="noopener noreferrer">
                                <Image
                                    src={igdbLogo}
                                    alt={`See ${name} at IGDB`}
                                    style={{
                                        opacity: 0.7,
                                        width: 30,
                                        display: 'inline-block'
                                    }}
                                />
                            </Link>
                        </Heading>
                    </Flex>

                    <Grid columns={{ xs: '3', initial: '1' }} gap="2" mb="4" align="start">
                        <Box>
                            <Flex gap="2" align="center">
                                <Text size="1" color="gray">
                                    Release Date
                                </Text>
                                <StatusArrow status={releaseDate.status} />
                            </Flex>
                            <Text
                                as="div"
                                size="3"
                                weight="bold"
                                wrap="nowrap"
                                color={releaseDate.correct}>
                                {releaseDate.value}
                            </Text>
                        </Box>

                        <Box>
                            <Flex gap="2" align="center">
                                <Text size="1" color="gray">
                                    Critic's&nbsp;score
                                </Text>
                                <StatusArrow status={score.status} />
                            </Flex>
                            <Text
                                as="div"
                                size="3"
                                weight="bold"
                                wrap="nowrap"
                                color={score.correct}>
                                {score.value}
                            </Text>
                        </Box>

                        <Box>
                            <Flex gap="2" align="center">
                                <Text size="1" color="gray">
                                    Developer
                                </Text>
                            </Flex>
                            <Text size="3" weight="bold" color={developer.correct} mr="1">
                                {developer.name}
                            </Text>
                            <Tooltip content={countryName}>
                                <Flag code={developer.country} style={{ width: 26 }} />
                            </Tooltip>
                        </Box>
                    </Grid>

                    <Flex gap="2" wrap="wrap">
                        {genresElements}
                    </Flex>

                    <Flex gap="2" wrap="wrap" mt="3">
                        {tagsElements}
                    </Flex>

                    <Flex gap="2" wrap="wrap" mt="3">
                        {platformsElements}
                    </Flex>
                </Box>
            </Flex>
            {winner && (
                <Image
                    src={winImg}
                    alt="winner"
                    style={{
                        position: 'absolute',
                        right: -10,
                        bottom: -10,
                        zIndex: -1,
                        opacity: 0.25
                    }}
                />
            )}
        </Card>
    )
}
