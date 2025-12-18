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
    const { guesses, game, hintData } = useContext(GuessContext)

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
    const [hints, setHints] = useState<TagsData>({ genres: [], tags: [], platforms: [] })

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

        setDeveloper({
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

        const gameGenres = getGameGenres(game)
        const guessedGenres = stripItems(
            guesses.map((i) => getGameGenres(i)),
            gameGenres
        )
        const hintGenres = hintData.genres.filter((i) => !guessedGenres.includes(i))

        const gameTags = getGameTags(game)
        const guessedTags = stripItems(
            guesses.map((i) => getGameTags(i)),
            gameTags
        )
        const hintTags = [
            ...hintData.themes,
            ...hintData.game_modes,
            ...hintData.player_perspectives
        ].filter((i) => !guessedTags.includes(i))

        const gamePlatforms = getGamePlatforms(game)
        const guessedPlatforms = stripItems(
            guesses.map((i) => getGamePlatforms(i)),
            gamePlatforms
        )
        const hintPlatforms = hintData.platforms.filter((i) => !guessedPlatforms.includes(i))

        setLabels({ genres: guessedGenres, tags: guessedTags, platforms: guessedPlatforms })
        setHints({ genres: hintGenres, tags: hintTags, platforms: hintPlatforms })
    }, [guesses, game, setLabels, setHints, hintData])

    return {
        year,
        criticsScore,
        developer,
        labels,
        hints,
        showSummary: guesses.length > 0
    }
}

function stripItems(items: string[][], exclude: string[]): string[] {
    return items
        .flat()
        .filter((value, index, array) => array.indexOf(value) === index)
        .filter((i) => exclude.includes(i))
}
