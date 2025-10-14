import { createContext } from 'react'
import { IgdbGameWithDeveloper } from '@t/IgdbData'

interface GuessContextData {
    game: IgdbGameWithDeveloper | null
    tries: number
    guesses: IgdbGameWithDeveloper[]
    suggestGameCallback: (gameId: number) => Promise<void>
    suggestGameIsLoading: boolean
}

const GuessContext = createContext<GuessContextData>({
    game: null,
    tries: 0,
    guesses: [],
    suggestGameCallback: async (gameId: number) => {},
    suggestGameIsLoading: false
})

export default GuessContext
