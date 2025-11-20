import { useContext, useEffect, useState } from 'react'
import GuessContext from '@/app/contexts/GuessContext'
import moment from 'moment'
import { IgdbGameDeveloper } from '@t/IgdbData'
import { getGameGenres, getGamePlatforms, getGameTags } from '@/app/utils/getGameProperties'
import { getCountryData, TCountryCode } from 'countries-list'
import iso from 'iso-3166-1'
import numberToString from '@/app/utils/numberToString'

type RangeData = {
    min: number | null
    max: number | null
    correct: number | null
}

type CountryData = {
    name: string
    slug: string
}

type DeveloperData = {
    excludedCountries: CountryData[]
    correct: {
        developerName: string | null
        country: CountryData | null
    }
}

type TagsData = {
    genres: string[]
    tags: string[]
    platforms: string[]
}

export default function useSummary() {
    const { guesses, game } = useContext(GuessContext)

    const [year, setYear] = useState<RangeData>({ min: null, max: null, correct: null })
    const [criticsScore, setCriticsScore] = useState<RangeData>({
        min: null,
        max: null,
        correct: null
    })
    const [developer, setDeveloper] = useState<DeveloperData>({
        excludedCountries: [],
        correct: {
            developerName: null,
            country: null
        }
    })
    const [labels, setLabels] = useState<TagsData>({ genres: [], tags: [], platforms: [] })

    useEffect(() => {
        if (!guesses || !game) return

        const gameYear = moment.unix(game.first_release_date).year()

        const guessesYears = guesses.map((i) => moment.unix(i.first_release_date).year())
        const yearsLess = guessesYears.filter((i) => i < gameYear)
        const yearsMore = guessesYears.filter((i) => i > gameYear)

        let minYear = yearsLess.length > 0 ? Math.max(...yearsLess) : null
        let maxYear = yearsMore.length > 0 ? Math.min(...yearsMore) : null

        if (minYear && maxYear && minYear === maxYear) {
            if (gameYear > minYear) {
                maxYear = null
            } else {
                minYear = null
            }
        }

        const correctYear = guessesYears.includes(gameYear) ? gameYear : null

        setYear({ min: minYear, max: maxYear, correct: correctYear })

        const gameCriticsScore = Math.floor(game.aggregated_rating)
        const guessCriticsScore = guesses.map((i) => Math.floor(i.aggregated_rating))

        const criticsScoreLess = guessCriticsScore.filter((i) => i < gameCriticsScore)
        const criticsScoreMore = guessCriticsScore.filter((i) => i > gameCriticsScore)

        let minCriticsScore = criticsScoreLess.length > 0 ? Math.max(...criticsScoreLess) : null
        let maxCriticsScore = criticsScoreMore.length > 0 ? Math.min(...criticsScoreMore) : null

        if (minCriticsScore && maxCriticsScore && minCriticsScore === maxCriticsScore) {
            if (gameCriticsScore > minCriticsScore) {
                maxCriticsScore = null
            } else {
                minCriticsScore = null
            }
        }

        const correctCriticsScore = guessCriticsScore.includes(gameCriticsScore)
            ? gameCriticsScore
            : null

        setCriticsScore({
            min: minCriticsScore,
            max: maxCriticsScore,
            correct: correctCriticsScore
        })

        const guessDevelopers: IgdbGameDeveloper[] = guesses
            .map((i) => i.developer)
            .filter((i) => i !== null)

        const isDeveloperGuessed = guessDevelopers.some((i) => i.id === game.developer?.id)
        const isCountryGuessed = guessDevelopers.some((i) => i.country === game.developer?.country)

        const gameCountrySlug = game.developer?.country
            ? iso.whereNumeric(numberToString(game.developer.country))?.alpha2
            : ''

        console.log({
            excludedCountries: guessDevelopers
                .filter(
                    (value, index, array) =>
                        array.findIndex((i) => i.country === value.country) === index
                )
                .map((i) => {
                    const slug = iso.whereNumeric(numberToString(i.country))?.alpha2

                    return {
                        name: getCountryData(slug as TCountryCode)?.name ?? '',
                        slug: slug ?? ''
                    }
                }),
            correct: {
                developerName: isDeveloperGuessed ? (game.developer?.name ?? null) : null,
                country: isCountryGuessed
                    ? {
                          name: getCountryData(gameCountrySlug as TCountryCode)?.name ?? '',
                          slug: gameCountrySlug ?? ''
                      }
                    : null
            }
        })

        setDeveloper({
            excludedCountries: guessDevelopers.map((i) => {
                const slug = iso.whereNumeric(numberToString(i.country))?.alpha2

                return {
                    name: getCountryData(slug as TCountryCode)?.name ?? '',
                    slug: slug ?? ''
                }
            }),
            correct: {
                developerName: isDeveloperGuessed ? (game.developer?.name ?? null) : null,
                country: isCountryGuessed
                    ? {
                          name: getCountryData(gameCountrySlug as TCountryCode)?.name ?? '',
                          slug: gameCountrySlug ?? ''
                      }
                    : null
            }
        })

        const gameGenres = getGameGenres(game)
        const guessedGenres = guesses
            .map((i) => getGameGenres(i))
            .flat()
            .filter((value, index, array) => array.indexOf(value) === index)
            .filter((i) => gameGenres.includes(i))

        const gameTags = getGameTags(game)
        const guessedTags = guesses
            .map((i) => getGameTags(i))
            .flat()
            .filter((value, index, array) => array.indexOf(value) === index)
            .filter((i) => gameTags.includes(i))

        const gamePlatforms = getGamePlatforms(game)
        const guessedPlatforms = guesses
            .map((i) => getGamePlatforms(i))
            .flat()
            .filter((value, index, array) => array.indexOf(value) === index)
            .filter((i) => gamePlatforms.includes(i))

        setLabels({ genres: guessedGenres, tags: guessedTags, platforms: guessedPlatforms })
    }, [guesses, game])

    return {
        year,
        criticsScore,
        developer,
        labels
    }
}
