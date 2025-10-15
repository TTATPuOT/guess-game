import IgdbClient from '@/services/IgdbClient'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('query')

    if (!query || query.length < 4) {
        return new Response(
            JSON.stringify({
                error: 'empty or small query'
            }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

    const client = new IgdbClient()
    const game = await client.search(query)

    return new Response(JSON.stringify(game), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}
