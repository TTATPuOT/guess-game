import IgdbClient from '@/services/IgdbClient'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const game = await new IgdbClient().getGame(parseInt(id))

    return new Response(JSON.stringify(game), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}
