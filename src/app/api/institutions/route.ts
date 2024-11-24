// app/api/institutions/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET metodu
export async function GET() {
    try {
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

// POST metodu
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const institution = await prisma.institutions.create({
            data: {
                name: body.name,
                address: body.address,
                email: body.email,
                phone: body.phone,
                registrationDate: body.registrationDate ? new Date(body.registrationDate) : new Date(),
            },
        });

        return NextResponse.json(institution);
    } catch (error) {
        console.log("[INSTITUTIONS_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}