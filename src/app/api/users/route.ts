// app/api/users/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserBloodType, UserSex } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        console.log("Received Form Data:", Object.fromEntries(formData.entries())); // Gelen verileri kontrol et

        
        // Şifreyi hashle
        const password = formData.get('password') as string;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Fotoğraf varsa işle
        const photo = formData.get('photo') as File;
        let photoUrl = '';
        if (photo) {
            // Burada fotoğraf yükleme işlemini yapın
            // photoUrl = await uploadPhoto(photo);
        }

        // Tarih dönüşümünü güvenli bir şekilde yapalım
        const birthdayStr = formData.get('birthday') as string;
        const birthday = birthdayStr ? new Date(birthdayStr) : null;

        // Tarih geçerli mi kontrol edelim
        if (birthdayStr && isNaN(birthday!.getTime())) {
            return new NextResponse("Invalid date format", { status: 400 });
        }

        const bloodTypeValue = formData.get('bloodType') as string;
        const sexValue = formData.get('sex') as string;

        console.log("Creating user with data:", {
            userName: formData.get('userName'),
            email: formData.get('email'),
            bloodType: bloodTypeValue,
            sex: sexValue,
            institutionId: formData.get('institutionId'),
            roleId: formData.get('roleId'),
        });

        const user = await prisma.users.create({
            data: {
                userName: formData.get('userName') as string,
                email: formData.get('email') as string,
                password: hashedPassword,
                firstName: formData.get('firstName') as string || null,
                lastName: formData.get('lastName') as string || null,
                bloodType: bloodTypeValue ? bloodTypeValue as UserBloodType : null,
                birthday: birthday,
                sex: sexValue ? sexValue as UserSex : null,
                phone: formData.get('phone') as string || null,
                photo: photoUrl || null,
                institutionId: formData.get('institutionId') as string,
                roleId: formData.get('roleId') as string,
            },
        });

        console.log("Created user:", user); // Oluşturulan kullanıcıyı kontrol et


        return NextResponse.json(user);
    } catch (error) {
        console.log("[USERS_POST] Detailed error:", error); // Detaylı hata bilgisi
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return new NextResponse(JSON.stringify({
                error: "Kullanıcı ID'si gerekli"
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // İlişkili kayıtları kontrol et
        const user = await prisma.users.findUnique({
            where: { id },
            include: {
                CreatorNotifications: true,
                RecipientNotifications: true,
                CreatorAppointments: true,
                ProviderAppointments: true,
                CreatorAnnouncements: true,
                RecipientAnnouncements: true,
                ProviderDevices: true,
                OwnerDevices: true,
                CreatorOfferCards: true,
                RecipientOfferCards: true,
                ProviderMaintenanceCards: true,
                CustomerMaintenanceCards: true,
                Logs: true
            }
        });

        if (!user) {
            return new NextResponse(JSON.stringify({
                error: "Kullanıcı bulunamadı"
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // İlişkili kayıtları kontrol et
        const relatedRecords = {
            creatorNotifications: user.CreatorNotifications.length,
            recipientNotifications: user.RecipientNotifications.length,
            creatorAppointments: user.CreatorAppointments.length,
            providerAppointments: user.ProviderAppointments.length,
            creatorAnnouncements: user.CreatorAnnouncements.length,
            recipientAnnouncements: user.RecipientAnnouncements.length,
            providerDevices: user.ProviderDevices.length,
            ownerDevices: user.OwnerDevices.length,
            creatorOfferCards: user.CreatorOfferCards.length,
            recipientOfferCards: user.RecipientOfferCards.length,
            providerMaintenanceCards: user.ProviderMaintenanceCards.length,
            customerMaintenanceCards: user.CustomerMaintenanceCards.length,
            logs: user.Logs.length
        };

        const hasRelatedRecords = Object.values(relatedRecords).some(count => count > 0);

        if (hasRelatedRecords) {
            return new NextResponse(JSON.stringify({
                error: "Bu kullanıcının ilişkili kayıtları bulunmaktadır. Önce ilişkili kayıtları silmelisiniz.",
                relatedRecords
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // İlişkili kayıt yoksa kullanıcıyı sil
        await prisma.users.delete({
            where: { id }
        });

        return new NextResponse(JSON.stringify({
            message: "Kullanıcı başarıyla silindi"
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("[USERS_DELETE]", error);
        
        return new NextResponse(JSON.stringify({
            error: "Kullanıcı silinirken bir hata oluştu",
            details: error instanceof Error ? error.message : 'Bilinmeyen hata'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

