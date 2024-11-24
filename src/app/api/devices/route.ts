// app/api/devices/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateQRCode } from "@/lib/utils/qrcode";
import { uploadPhoto } from "@/lib/utils/upload";
import { DeviceStatus } from "@prisma/client";

export async function GET() {
   try {
       const devices = await prisma.devices.findMany({
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
           },
           orderBy: {
               serialNumber: 'asc'
           }
       });

       return NextResponse.json(devices);
   } catch (error) {
       console.error("[DEVICES_GET] Error:", error);
       
       if (error instanceof Error) {
           return new NextResponse(
               `Error: ${error.message}`,
               { status: 500 }
           );
       }
       
       return new NextResponse(
           'An unknown error occurred while fetching devices',
           { status: 500 }
       );
   }
}

export async function POST(req: Request) {
   try {
       const formData = await req.formData();
       
       // Debug için form verisini logla
       console.log("API'ye gelen form verisi:", Object.fromEntries(formData.entries()));

       // Zorunlu alanları kontrol et
       const requiredFields = [
           'serialNumber',
           'typeId',
           'featureId',
           'productionDate',
           'lastControlDate',
           'expirationDate',
           'nextControlDate',
           'location',
           'currentStatus',
           'ownerId',
           'ownerInstId',
           'providerId',
           'providerInstId',
           'isgMemberId',
           'details'
       ];

       for (const field of requiredFields) {
           const value = formData.get(field);
           if (!value) {
               return new NextResponse(
                   `Missing required field: ${field}`,
                   { status: 400 }
               );
           }
       }

       // Fotoğraf yükleme
       const photo = formData.get('photo') as File;
       let photoUrl = '';
       if (photo && photo.size > 0) {
           try {
               photoUrl = await uploadPhoto(photo);
           } catch (uploadError) {
               console.error("Photo upload error:", uploadError);
               return new NextResponse(
                   'Error uploading photo: ' + (uploadError instanceof Error ? uploadError.message : 'Unknown error'),
                   { status: 400 }
               );
           }
       }

       // QR kod oluştur
       const serialNumber = formData.get('serialNumber') as string;
       let qrCode: string;
       try {
           qrCode = await generateQRCode(serialNumber);
       } catch (qrError) {
           console.error("QR code generation error:", qrError);
           return new NextResponse(
               'Error generating QR code: ' + (qrError instanceof Error ? qrError.message : 'Unknown error'),
               { status: 400 }
           );
       }

       // Tarihleri işle
       const dates = {
           productionDate: new Date(formData.get('productionDate') as string),
           lastControlDate: new Date(formData.get('lastControlDate') as string),
           expirationDate: new Date(formData.get('expirationDate') as string),
           nextControlDate: new Date(formData.get('nextControlDate') as string)
       };

       // Tarih validasyonu
       for (const [key, value] of Object.entries(dates)) {
           if (isNaN(value.getTime())) {
               return new NextResponse(
                   `Invalid date format for ${key}`,
                   { status: 400 }
               );
           }
       }

       // Enum validasyonu
       const status = formData.get('currentStatus') as DeviceStatus;
       if (!Object.values(DeviceStatus).includes(status)) {
           return new NextResponse(
               'Invalid device status',
               { status: 400 }
           );
       }

       // Device oluştur
       const device = await prisma.devices.create({
           data: {
               serialNumber,
               qrcode: qrCode,
               productionDate: dates.productionDate,
               lastControlDate: dates.lastControlDate,
               expirationDate: dates.expirationDate,
               nextControlDate: dates.nextControlDate,
               location: formData.get('location') as string,
               photo: photoUrl || null,
               currentStatus: status,
               typeId: formData.get('typeId') as string,
               featureId: formData.get('featureId') as string,
               ownerId: formData.get('ownerId') as string,
               ownerInstId: formData.get('ownerInstId') as string,
               providerId: formData.get('providerId') as string,
               providerInstId: formData.get('providerInstId') as string,
               isgMemberId: formData.get('isgMemberId') as string,
               details: formData.get('details') as string,
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

       return NextResponse.json({
           success: true,
           data: device
       });

   } catch (error) {
       console.error("[DEVICES_POST] Detailed error:", error);
       
       if (error instanceof Error) {
           // Prisma hataları için özel kontrol
           if (error.name === 'PrismaClientKnownRequestError') {
               if ((error as any).code === 'P2002') {
                   return new NextResponse(
                       'A device with this serial number already exists',
                       { status: 400 }
                   );
               }
           }

           return new NextResponse(
               `Database error: ${error.message}`,
               { status: 500 }
           );
       }
       
       return new NextResponse(
           'An unknown error occurred while creating device',
           { status: 500 }
       );
   }
}