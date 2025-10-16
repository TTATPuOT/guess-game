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

export interface IgdbGameMode {
    id: number
    name: string
}

export interface IgdbGameGenre {
    id: number
    name: string
}

export interface IgdbGameTheme {
    id: number
    name: string
}

export interface IgdbGameInvolvedCompany {
    id: number
    company: number
    developer: boolean
}

export interface IgdbGamePlatform {
    id: number
    name: string
}

export interface IgdbGamePerspectives {
    id: number
    name: string
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
