import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Prisma'dan veritabanı bağlantısını sağlayın.

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const recipientInsId=  searchParams.get('recipientInsId');
    const creatorInsId=  searchParams.get('creatorInsId');

    try {
        const offers = await prisma.offerCards.findMany({
            where: {
                OR: [
                    ...recipientInsId ? [{ recipientInsId: recipientInsId }] : [],
                    ...creatorInsId ? [{ creatorInsId: creatorInsId }] : []
                ],
            },
        });
        return NextResponse.json(offers);
    } catch (error) {
        return NextResponse.json({ error: 'Veri getirilemedi.' }, { status: 500 });
    }
}