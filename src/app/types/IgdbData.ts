export interface IgdbGame {
    id: number
    aggregated_rating: number
    aggregated_rating_count: number
    cover: IgdbGameCover
    first_release_date: number
    game_modes: IgdbGameMode[]
    genres: IgdbGameGenre[]
    themes: IgdbGameTheme[]
    involved_companies: IgdbGameInvolvedCompany[] | undefined
    name: string
    platforms: IgdbGamePlatform[]
    player_perspectives: IgdbGamePerspectives[]
    rating: number
    rating_count: number
    slug: string
    game_type: IgdbGameGameType
}

export interface IgdbGameWithDeveloper extends IgdbGame {
    developer: IgdbGameDeveloper | null
}

export interface IgdbGameCover {
    id: number
    image_id: string
}

export interface IgdbGameTag {
    id: number
    name: string
}

export type IgdbGameTagKeys =
    | 'game_modes'
    | 'genres'
    | 'themes'
    | 'player_perspectives'
    | 'platforms'

export interface IgdbGameMode extends IgdbGameTag {}

export interface IgdbGameGenre extends IgdbGameTag {}

export interface IgdbGameTheme extends IgdbGameTag {}

export interface IgdbGamePlatform extends IgdbGameTag {}

export interface IgdbGamePerspectives extends IgdbGameTag {}

export interface IgdbGameInvolvedCompany {
    id: number
    company: number
    developer: boolean
}

export interface IgdbGameGameType {
    id: number
    type: string
    created_at: number
    updated_at: number
    checksum: string
}

export interface IgdbGameDeveloper {
    id: number
    country: number
    name: string
}
