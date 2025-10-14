import apicalypse from 'apicalypse'
import OAuthService from '@/services/OAuthService'
import { IgdbGame, IgdbGameDeveloper, IgdbGameWithDeveloper } from '@t/IgdbData'

export default class IgdbClient {
    private gamesCount = 1000 // Кол-во игр, доступных по фильтру. Пока не уверен, как иначе рандомить игру

    private endpoint = 'https://api.igdb.com/v4'

    async search(query: string): Promise<IgdbGame[]> {
        const request = (
            await this.getBaseGameRequest(
                query.split(' ').map((q) => `name ~ *"${q}"*`) // Дробим параметры, чтобы сделать более "эластичный" поиск
            )
        ).limit(5)

        const result = await request.request(this.endpoint + '/games')

        return result.data
    }

    async getGame(id: number): Promise<IgdbGameWithDeveloper> {
        const request = (await this.getBaseGameRequest([`id = ${id}`])).limit(1)

        const result = await request.request(this.endpoint + '/games')
        const data = result.data[0] as IgdbGame

        if (!data) {
            throw new Error('Cant find the game')
        }

        return this.appendDeveloper(data)
    }

    async getRandomGame(): Promise<IgdbGameWithDeveloper> {
        const request = (await this.getBaseGameRequest()).limit(1).offset(this.getRandomOffset())

        const result = await request.request(this.endpoint + '/games')
        const data = result.data[0] as IgdbGame

        if (!data) {
            throw new Error('Cant find any game')
        }

        return this.appendDeveloper(data)
    }

    private async appendDeveloper(game: IgdbGame): Promise<IgdbGameWithDeveloper> {
        const gameWithDeveloper: IgdbGameWithDeveloper = {
            ...game,
            developer: null
        }

        if (game && game.involved_companies && game.involved_companies.length > 0) {
            const developers = game.involved_companies
                .filter((i) => i.developer)
                .map((i) => i.company)

            if (developers && developers.length > 0) {
                gameWithDeveloper.developer = await this.getCompany(developers[0])
            }
        }

        return gameWithDeveloper
    }

    async getCompany(companyId: number): Promise<IgdbGameDeveloper> {
        const request = await this.createRequest()

        request
            .query('company', 'Company')
            .fields(['name', 'country'])
            .where([`id = ${companyId}`])
            .limit(1)

        const result = await request.request(this.endpoint + '/companies')

        return result.data[0]
    }

    private async getBaseGameRequest(additionalWhere: string[] = []) {
        return (await this.createRequest())
            .query('games', 'Games')
            .fields([
                'name',
                'aggregated_rating',
                'aggregated_rating_count',
                'rating',
                'rating_count',
                'first_release_date',
                'involved_companies.company',
                'involved_companies.developer',
                'genres.name',
                'game_modes.name',
                'player_perspectives.name',
                'platforms.name',
                'slug',
                'cover.image_id',
                'platforms.name',
                'game_type.*'
            ])
            .where([
                'aggregated_rating > 75',
                'aggregated_rating_count > 3',
                'rating_count > 40',
                'game_type = 0',
                ...additionalWhere
            ])
            .sort('aggregated_rating desc')
    }

    private async createRequest() {
        const token = await OAuthService.getToken()

        return apicalypse({
            queryMethod: 'body',
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                'Client-ID': process.env.IGDB_CLIENT_ID!!
            }
        })
    }

    private getRandomOffset(): number {
        return Math.floor(Math.random() * this.gamesCount)
    }
}
