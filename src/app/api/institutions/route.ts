// app/api/institutions/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (userId) {
            // Raw SQL sorgusu ile kullanıcının kurumunu bulalım
            const userInstitution = await prisma.$queryRaw`
                SELECT i.id, i.name, i.address, i.email, i.phone
                FROM "Users" u
                JOIN "Institutions" i ON u."institutionId" = i.id
                WHERE u.id = ${userId}
            `;

            return NextResponse.json(userInstitution);
        }

        // userId yoksa tüm kurumları getir
        const institutions = await prisma.institutions.findMany({
            select: {
                id: true,
                name: true,
                address: true,
                email: true,
                phone: true,
            },
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(institutions);
    } catch (error) {
        console.log("[INSTITUTIONS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}