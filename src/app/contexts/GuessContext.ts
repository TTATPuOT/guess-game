import { createContext } from 'react'
import { IgdbGameWithDeveloper } from '@t/IgdbData'
import { HintData } from '@t/HintData'

interface GuessContextData {
    game: IgdbGameWithDeveloper | null
    guesses: IgdbGameWithDeveloper[]
    suggestGameCallback: (gameId: number) => Promise<void>
    suggestGameIsLoading: boolean
    hintData: HintData
    setHintData: (hintData: HintData) => void
}

const GuessContext = createContext<GuessContextData>({
    game: null,
    guesses: [],
    suggestGameCallback: async () => {},
    suggestGameIsLoading: false,
    hintData: {
        game_modes: [],
        genres: [],
        themes: [],
        platforms: [],
        player_perspectives: [],
        count: 0
    },
    setHintData: () => {}
})

export default GuessContext
