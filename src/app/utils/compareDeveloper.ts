import { GameMetricCorrect } from '@t/GameData'
import { IgdbGameDeveloper } from '@t/IgdbData'

export function compareDeveloperCorrect(
    a: IgdbGameDeveloper | null = null,
    b: IgdbGameDeveloper | null | undefined = null
): GameMetricCorrect {
    if (!a || !b) {
        return GameMetricCorrect.DEFAULT
    }

    if (a.id === b.id) {
        return GameMetricCorrect.CORRECT
    }

    if (a.country === b.country) {
        return GameMetricCorrect.SIMILAR
    }

    return GameMetricCorrect.DEFAULT
}
