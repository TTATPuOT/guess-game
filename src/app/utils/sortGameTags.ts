import { GameMetricCorrect, GameTag } from '@t/GameData'

export default function sortGameTags(a: GameTag, b: GameTag) {
    return getScore(b) - getScore(a)
}

function getScore(i: GameTag) {
    if (i.status === GameMetricCorrect.CORRECT) {
        return 1
    } else if (i.status === GameMetricCorrect.SIMILAR) {
        return 0
    }

    return -1
}
