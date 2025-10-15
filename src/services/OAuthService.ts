import fetch from 'node-fetch'

interface AccessToken {
    token: string
    expires: Date
}

interface AccessTokenResponse {
    access_token: string
    expires_in: number
    token_type: 'bearer'
}

export default class OAuthService {
    private static endpoint = 'https://id.twitch.tv/oauth2/token'

    private static safeSecondsToRefreshToken = 604800

    private static accessToken: AccessToken

    private static async getNewToken(): Promise<AccessToken> {
        const url = new URL(OAuthService.endpoint)
        url.searchParams.append('client_id', process.env.IGDB_CLIENT_ID!!)
        url.searchParams.append('client_secret', process.env.IGDB_SECRET_KEY!!)
        url.searchParams.append('grant_type', 'client_credentials')

        const response = await fetch(url, { method: 'POST' })

        const json = (await response.json()) as AccessTokenResponse

        const expiresDate = new Date()
        expiresDate.setSeconds(
            expiresDate.getSeconds() + json.expires_in - OAuthService.safeSecondsToRefreshToken
        )

        return {
            token: json.access_token,
            expires: expiresDate
        }
    }

    private static isTokenExpires(): boolean {
        return !OAuthService.accessToken || OAuthService.accessToken.expires < new Date()
    }

    static async getToken(): Promise<string> {
        if (OAuthService.isTokenExpires()) {
            OAuthService.accessToken = await OAuthService.getNewToken()
        }

        return OAuthService.accessToken.token
    }
}
