import {Box, Card, Flex, Grid, Heading, Inset, Text, Tooltip} from "@radix-ui/themes";
import {GameData} from "@t/GameData";
import StatusArrow from "@/app/components/StatusArrow";
import Flag from 'react-world-flags'
import {useMemo} from "react";
import GameBadge from "@/app/components/GameBadge";
import sortGameTags from "@/app/utils/sortGameTags";
import {getCountryData, TCountryCode} from "countries-list";

interface GameProps extends GameData {}

export default function Game({name, releaseDate, developer, score, genres, tags, platforms}: GameProps) {
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

    const countryName = useMemo(() => getCountryData(developer.country as TCountryCode)?.name, [developer.country])

    return <Card size="2" mb="5">
        <Flex>
            <Inset clip="border-box" side="left" mr="3" style={{ minWidth: 190, maxWidth: 190 }}>
                <img
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "var(--gray-5)",
                    }}
                    src="https://upload.wikimedia.org/wikipedia/ru/8/8d/Kingdom_Come_-_Deliverance_II.jpg"
                    alt={name}
                />
            </Inset>
            <Box>
                <Heading as="h3" size="5" trim="start" mb="5">{name}</Heading>

                <Grid columns="3" gap="2" mb="2" align="start">
                    <Box>
                        <Flex gap="2" align="center">
                            <Text size="1" color="gray">
                                Release Date
                            </Text>
                            <StatusArrow status={releaseDate.status} />
                        </Flex>
                        <Text as="div" size="3" weight="bold" wrap="nowrap" color={releaseDate.correct}>
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
                        <Text as="div" size="3" weight="bold" wrap="nowrap" color={score.correct}>
                            {score.value}
                        </Text>
                    </Box>

                    <Box>
                        <Flex gap="2" align="center">
                            <Text size="1" color="gray">
                                Developer
                            </Text>
                            <StatusArrow status={developer.status} />
                        </Flex>
                        <Text size="3" weight="bold" color={developer.correct}>
                            {developer.name}
                        </Text>
                        <Tooltip content={countryName}>
                            <Flag code={developer.country} style={{ width: 26, marginLeft: 5 }} />
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
    </Card>
}