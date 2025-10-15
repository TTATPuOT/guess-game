import { GameMetricCorrect } from '@t/GameData'
import Game from '@/app/components/Game'
import { useContext, useMemo } from 'react'
import GuessContext from '@/app/contexts/GuessContext'
import getIgdbImageUrl, { IgdbImageSize } from '@/app/utils/getIgdbImageUrl'
import moment from 'moment'
import iso from 'iso-3166-1'
import { Box } from '@radix-ui/themes'
import GameLoading from '@/app/components/GameLoading'
import { compareRating, compareRatingCorrect } from '@/app/utils/compareRating'
import { compareDeveloperCorrect } from '@/app/utils/compareDeveloper'
import numberToString from '@/app/utils/numberToString'
import { compareDate, compareDateCorrect } from '@/app/utils/compareDate'

export default function GuessedGames() {
    const { guesses, suggestGameIsLoading, game } = useContext(GuessContext)

    const games = useMemo(() => {
        const items = guesses.map((g) => {
            const genres = g.genres.map((i) => {
                const isCorrect = game?.genres.some((g) => g.id === i.id) || false

                return {
                    name: i.name,
                    status: isCorrect ? GameMetricCorrect.CORRECT : GameMetricCorrect.DEFAULT
                }
            })

            const tags = [
                ...g.game_modes.map((i) => {
                    const isCorrect = game?.game_modes.some((g) => g.id === i.id) || false

                    return {
                        name: i.name,
                        status: isCorrect ? GameMetricCorrect.CORRECT : GameMetricCorrect.DEFAULT
                    }
                }),
                ...g.player_perspectives.map((i) => {
                    const isCorrect = game?.player_perspectives.some((g) => g.id === i.id) || false

                    return {
                        name: i.name,
                        status: isCorrect ? GameMetricCorrect.CORRECT : GameMetricCorrect.DEFAULT
                    }
                })
            ]

            const platforms = g.platforms.map((i) => {
                const isCorrect = game?.platforms.some((g) => g.id === i.id) || false

                return {
                    name: i.name,
                    status: isCorrect ? GameMetricCorrect.CORRECT : GameMetricCorrect.DEFAULT
                }
            })

            return (
                <Game
                    key={g.id}
                    winner={g.id === game?.id}
                    name={g.name}
                    image={getIgdbImageUrl(IgdbImageSize.cover_big, g.cover.image_id)}
                    releaseDate={{
                        value: moment.unix(g.first_release_date).format('MMM YYYY'),
                        status: compareDate(g.first_release_date, game?.first_release_date),
                        correct: compareDateCorrect(g.first_release_date, game?.first_release_date)
                    }}
                    score={{
                        value: Math.floor(g.aggregated_rating).toString(),
                        status: compareRating(g.aggregated_rating, game?.aggregated_rating),
                        correct: compareRatingCorrect(g.aggregated_rating, game?.aggregated_rating)
                    }}
                    developer={{
                        name: g.developer?.name || '',
                        country: g.developer
                            ? iso.whereNumeric(numberToString(g.developer.country))?.alpha2 || ''
                            : '',
                        correct: compareDeveloperCorrect(g.developer, game?.developer)
                    }}
                    genres={genres}
                    tags={tags}
                    platforms={platforms}
                />
            )
        })

        if (suggestGameIsLoading) {
            return [<GameLoading key="loading" />, ...items]
        }

        return items
    }, [guesses, suggestGameIsLoading, game])

    return <Box width="100%">{games}</Box>
}
