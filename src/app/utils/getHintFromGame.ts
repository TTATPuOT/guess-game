import { IgdbGameTagKeys, IgdbGameWithDeveloper } from '@t/IgdbData'
import { HintData } from '@t/HintData'
import getRandomArrayItems from '@/app/utils/getRandomArrayItems'

export default function getHintFromGame(
    game: IgdbGameWithDeveloper,
    guesses: IgdbGameWithDeveloper[],
    hintData: HintData
): HintData {
    return {
        genres: [
            ...hintData.genres,
            ...getRandomArrayItems(getGameUnguessedTags(game, guesses, hintData, 'genres'))
        ],
        game_modes: [
            ...hintData.game_modes,
            ...getRandomArrayItems(getGameUnguessedTags(game, guesses, hintData, 'game_modes'))
        ],
        player_perspectives: [
            ...hintData.player_perspectives,
            ...getRandomArrayItems(
                getGameUnguessedTags(game, guesses, hintData, 'player_perspectives')
            )
        ],
        platforms: [
            ...hintData.platforms,
            ...getRandomArrayItems(getGameUnguessedTags(game, guesses, hintData, 'platforms'))
        ],
        themes: [
            ...hintData.themes,
            ...getRandomArrayItems(getGameUnguessedTags(game, guesses, hintData, 'themes'))
        ]
    }
}

function getGameUnguessedTags(
    game: IgdbGameWithDeveloper,
    guesses: IgdbGameWithDeveloper[],
    hintData: HintData,
    type: IgdbGameTagKeys
): string[] {
    const guessedItems = [
        ...hintData[type],
        ...guesses
            .map((g) => g[type])
            .flat()
            .map((t) => t.name)
    ]

    return game[type].filter((g) => !guessedItems.some((t) => t === g.name)).map((g) => g.name)
}
