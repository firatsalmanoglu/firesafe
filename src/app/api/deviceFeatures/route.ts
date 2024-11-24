// app/api/deviceFeatures/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const features = await prisma.deviceFeatures.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(features);
    } catch (error) {
        console.log("[DEVICE_FEATURES_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}