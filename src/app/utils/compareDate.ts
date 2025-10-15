import { GameMetricCorrect, GameMetricStatus } from '@t/GameData'
import moment from 'moment'

export function compareDate(a: number, b: number | undefined = undefined): GameMetricStatus {
    if (!b) {
        return GameMetricStatus.DEFAULT
    }

    const aDate = moment.unix(a)
    const bDate = moment.unix(b)

    if (aDate.isSame(bDate, 'month')) {
        return GameMetricStatus.DEFAULT
    } else if (aDate.isAfter()) {
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

    if (aDate.isSame(bDate, 'month')) {
        return GameMetricCorrect.CORRECT
    }

    if (aDate.isSame(bDate, 'year')) {
        return GameMetricCorrect.SIMILAR
    }

    return GameMetricCorrect.DEFAULT
}
