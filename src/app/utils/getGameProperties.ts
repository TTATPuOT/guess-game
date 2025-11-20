import { IgdbGame } from '@t/IgdbData'

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

const naturalSort = (a: string, b: string) => collator.compare(a, b)

export function getGameGenres(game: IgdbGame): string[] {
    return game.genres ? game.genres?.map((i) => i.name).sort(naturalSort) : []
}

export function getGameTags(game: IgdbGame): string[] {
    const themes = game.themes ? game.themes.map((i) => i.name).sort(naturalSort) : []

    const gameModes = game.game_modes ? game.game_modes.map((i) => i.name).sort(naturalSort) : []

    const playerPerspectives = game.player_perspectives
        ? game.player_perspectives.map((i) => i.name).sort(naturalSort)
        : []

    return [...themes, ...gameModes, ...playerPerspectives]
}

export function getGamePlatforms(game: IgdbGame): string[] {
    return game.platforms ? game.platforms?.map((i) => i.name).sort(naturalSort) : []
}
