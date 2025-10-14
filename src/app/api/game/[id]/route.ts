import IgdbClient from '@/services/IgdbClient'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: number }> }) {
    const { id } = await params

    const game = await new IgdbClient().getGame(id)

    return new Response(JSON.stringify(game), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}
