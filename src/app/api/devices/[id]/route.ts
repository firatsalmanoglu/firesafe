// app/api/devices/[id]/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const device = await prisma.devices.findUnique({
            where: {
                id: params.id
            },
            include: {
                type: true,
                feature: true,
                owner: {
                    select: {
                        id: true,
                        userName: true,
                        firstName: true,
                        lastName: true,
                    }
                },
                ownerIns: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                provider: {
                    select: {
                        id: true,
                        userName: true,
                        firstName: true,
                        lastName: true,
                    }
                },
                providerIns: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                isgMember: {
                    select: {
                        id: true,
                        name: true,
                        isgNumber: true,
                    }
                }
            }
        });

        if (!device) {
            return new NextResponse(
                'Device not found',
                { status: 404 }
            );
        }

        return NextResponse.json(device);

    } catch (error) {
        console.error("[DEVICE_GET] Error:", error);
        
        if (error instanceof Error) {
            return new NextResponse(
                `Error: ${error.message}`,
                { status: 500 }
            );
        }
        
        return new NextResponse(
            'An unknown error occurred',
            { status: 500 }
        );
    }
}