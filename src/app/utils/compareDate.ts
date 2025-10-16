import { GameMetricCorrect, GameMetricStatus } from '@t/GameData'
import moment from 'moment'
import { MAX_RELEASE_DATE_YEARS_SIMILAR_RANGE } from '@/app/constatnts'

export function compareDate(a: number, b: number | undefined = undefined): GameMetricStatus {
    if (!b) {
        return GameMetricStatus.DEFAULT
    }

    const aDate = moment.unix(a)
    const bDate = moment.unix(b)

    if (aDate.isSame(bDate, 'year')) {
        return GameMetricStatus.DEFAULT
    } else if (aDate.isBefore(bDate)) {
        return GameMetricStatus.LESS
    }

    return GameMetricStatus.GREATER
}

export function compareDateCorrect(
    a: number,
    b: number | undefined = undefined
): GameMetricCorrect {
    if (!b) {
        return GameMetricCorrect.DEFAULT
    }

    const aDate = moment.unix(a)
    const bDate = moment.unix(b)

    if (aDate.isSame(bDate, 'year')) {
        return GameMetricCorrect.CORRECT
    }

    const aMin = aDate.subtract(MAX_RELEASE_DATE_YEARS_SIMILAR_RANGE, 'years')
    const aMax = aDate.add(MAX_RELEASE_DATE_YEARS_SIMILAR_RANGE, 'years')

    if (aMin.isAfter(bDate, 'year') && aMax.isBefore(bDate, 'year')) {
        return GameMetricCorrect.SIMILAR
    }

    return GameMetricCorrect.DEFAULT
}
