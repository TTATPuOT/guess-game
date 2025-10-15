import { GameMetricCorrect, GameMetricStatus } from '@t/GameData'
import { MAX_CRITICS_SCORE_SIMILAR_RANGE } from '@/app/constatnts'

export function compareRating(a: number, b: number | undefined = undefined): GameMetricStatus {
    if (!b) {
        return GameMetricStatus.DEFAULT
    }

    a = Math.floor(a)
    b = Math.floor(b)

    if (a > b) {
        return GameMetricStatus.GREATER
    } else if (a < b) {
        return GameMetricStatus.LESS
    }

    return GameMetricStatus.DEFAULT
}

export function compareRatingCorrect(
    a: number,
    b: number | undefined = undefined
): GameMetricCorrect {
    if (!b) {
        return GameMetricCorrect.DEFAULT
    }

    a = Math.floor(a)
    b = Math.floor(b)

    if (a === b) {
        return GameMetricCorrect.CORRECT
    }

    const minA = a - MAX_CRITICS_SCORE_SIMILAR_RANGE
    const maxA = a + MAX_CRITICS_SCORE_SIMILAR_RANGE

    if (minA < b && b < maxA) {
        return GameMetricCorrect.SIMILAR
    }

    return GameMetricCorrect.DEFAULT
}
