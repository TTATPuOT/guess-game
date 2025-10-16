import { createContext } from 'react'
import { IgdbGameWithDeveloper } from '@t/IgdbData'

interface GuessContextData {
    game: IgdbGameWithDeveloper | null
    guesses: IgdbGameWithDeveloper[]
    suggestGameCallback: (gameId: number) => Promise<void>
    suggestGameIsLoading: boolean
}

const GuessContext = createContext<GuessContextData>({
    game: null,
    guesses: [],
    suggestGameCallback: async () => {},
    suggestGameIsLoading: false
})

export default GuessContext
