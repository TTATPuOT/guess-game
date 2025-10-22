import { IgdbGameWithDeveloper } from '@t/IgdbData'
import { GameMetricCorrect } from '@t/GameData'
import Game from '@/app/components/Game'
import getIgdbImageUrl, { IgdbImageSize } from '@/app/utils/getIgdbImageUrl'
import moment from 'moment/moment'
import { compareDate, compareDateCorrect } from '@/app/utils/compareDate'
import { compareRating, compareRatingCorrect } from '@/app/utils/compareRating'
import iso from 'iso-3166-1'
import numberToString from '@/app/utils/numberToString'
import { compareDeveloperCorrect } from '@/app/utils/compareDeveloper'
import { useContext, useMemo } from 'react'
import GuessContext from '@/app/contexts/GuessContext'
import getIgdbGameUrl from '@/app/utils/getIgdbGameUrl'

interface IgdbGameHocProps {
    data: IgdbGameWithDeveloper
}

export default function IgdbGameHoc({ data }: IgdbGameHocProps) {
    const { game } = useContext(GuessContext)

    const genres = useMemo(() => {
        return data.genres.map((i) => {
            const isCorrect = game?.genres.some((g) => g.id === i.id) || false

            return {
                name: i.name,
                status: isCorrect ? GameMetricCorrect.CORRECT : GameMetricCorrect.DEFAULT
            }
        })
    }, [data.genres, game?.genres])

    const tags = useMemo(() => {
        return [
            ...data.themes.map((i) => {
                const isCorrect = game?.themes.some((g) => g.id === i.id) || false

                return {
                    name: i.name,
                    status: isCorrect ? GameMetricCorrect.CORRECT : GameMetricCorrect.DEFAULT
                }
            }),
            ...data.game_modes.map((i) => {
                const isCorrect = game?.game_modes.some((g) => g.id === i.id) || false

                return {
                    name: i.name,
                    status: isCorrect ? GameMetricCorrect.CORRECT : GameMetricCorrect.DEFAULT
                }
            }),
            ...data.player_perspectives.map((i) => {
                const isCorrect = game?.player_perspectives.some((g) => g.id === i.id) || false

                return {
                    name: i.name,
                    status: isCorrect ? GameMetricCorrect.CORRECT : GameMetricCorrect.DEFAULT
                }
            })
        ]
    }, [
        data.themes,
        data.themes,
        data.game_modes,
        data.player_perspectives,
        game?.game_modes,
        game?.player_perspectives
    ])

    const platforms = useMemo(() => {
        return data.platforms.map((i) => {
            const isCorrect = game?.platforms.some((g) => g.id === i.id) || false

            return {
                name: i.name,
                status: isCorrect ? GameMetricCorrect.CORRECT : GameMetricCorrect.DEFAULT
            }
        })
    }, [data.platforms, game?.platforms])

    const releaseDate = useMemo(
        () => ({
            value: moment.unix(data.first_release_date).format('YYYY'),
            status: compareDate(data.first_release_date, game?.first_release_date),
            correct: compareDateCorrect(data.first_release_date, game?.first_release_date)
        }),
        [data.first_release_date, game?.first_release_date]
    )

    const score = useMemo(
        () => ({
            value: Math.floor(data.aggregated_rating).toString(),
            status: compareRating(data.aggregated_rating, game?.aggregated_rating),
            correct: compareRatingCorrect(data.aggregated_rating, game?.aggregated_rating)
        }),
        [data.aggregated_rating, game?.aggregated_rating]
    )

    const developer = useMemo(
        () => ({
            name: data.developer?.name || '',
            country: data.developer
                ? iso.whereNumeric(numberToString(data.developer.country))?.alpha2 || ''
                : '',
            correct: compareDeveloperCorrect(data.developer, game?.developer)
        }),
        [data.developer, game?.developer]
    )

    const imageUrl = useMemo(
        () => getIgdbImageUrl(IgdbImageSize.cover_big, data.cover.image_id),
        [data.cover.image_id]
    )

    const link = useMemo(() => getIgdbGameUrl(data.slug), [data.slug])

    return (
        <Game
            winner={data.id === game?.id}
            name={data.name}
            image={imageUrl}
            link={link}
            releaseDate={releaseDate}
            score={score}
            developer={developer}
            genres={genres}
            tags={tags}
            platforms={platforms}
        />
    )
}
