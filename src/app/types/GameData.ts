export enum GameMetricStatus {
    LESS = 'red',
    DEFAULT = 'gray',
    GREATER = 'grass'
}

export enum GameMetricCorrect {
    DEFAULT = 'gray',
    CORRECT = 'grass',
    SIMILAR = 'yellow'
}

export interface GameData {
    name: string
    image: string
    releaseDate: GameMetric
    score: GameMetric
    developer: GameDeveloper
    genres: GameTag[]
    tags: GameTag[]
    platforms: GameTag[]
}

export interface GameMetric {
    value: string
    correct: GameMetricCorrect
    status: GameMetricStatus
}

export interface GameTag {
    name: string
    status: GameMetricCorrect
}

export interface GameDeveloper {
    name: string
    country: string
    correct: GameMetricCorrect
}
