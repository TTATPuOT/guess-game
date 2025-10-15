import IgdbClient from '@/services/IgdbClient'

export async function GET(request: Request) {
    const client = new IgdbClient()
    const game = await client.getRandomGame()

    return new Response(JSON.stringify(game), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}
