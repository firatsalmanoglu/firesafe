// components/DeviceForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
import Image from "next/image";
import DeviceTypeSelect from "@/components/DeviceTypeSelect";
import DeviceFeatureSelect from "@/components/DeviceFeatureSelect";
import UserSelect from "@/components/UserSelect";
import InstitutionSelect from "@/components/InstitutionSelect";
import IsgMemberSelect from "@/components/IsgMemberSelect";

const schema = z.object({
  serialNumber: z.string()
    .min(3, { message: "Seri No min 3 karakter uzunluğunda olmalı!" })
    .max(20, { message: "Seri No maks 20 karakter uzunluğunda olmalı!" }),
  productionDate: z.string().min(1, { message: "Üretim tarihi zorunludur" }),
  lastControlDate: z.string().min(1, { message: "Son kontrol tarihi zorunludur" }),
  expirationDate: z.string().min(1, { message: "Son kullanma tarihi zorunludur" }),
  nextControlDate: z.string().min(1, { message: "Sonraki kontrol tarihi zorunludur" }),
  location: z.string().min(1, { message: "Konum zorunludur" }),
  currentStatus: z.enum(["Aktif", "Pasif"]),
  typeId: z.string().min(1, { message: "Cihaz tipi seçimi zorunludur" }),
  featureId: z.string().min(1, { message: "Cihaz özelliği seçimi zorunludur" }),
  ownerId: z.string().min(1, { message: "Cihaz sahibi seçimi zorunludur" }),
  ownerInstId: z.string().min(1, { message: "Sahip kurum seçimi zorunludur" }),
  providerId: z.string().min(1, { message: "Hizmet sağlayıcı seçimi zorunludur" }),
  providerInstId: z.string().min(1, { message: "Sağlayıcı kurum seçimi zorunludur" }),
  isgMemberId: z.string().min(1, { message: "ISG üyesi seçimi zorunludur" }),
  details: z.string().min(1, { message: "Detaylar zorunludur" }),
  photo: z.any().optional(),
});

type Inputs = z.infer<typeof schema>;

const DeviceForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch, // watch'ı ekleyelim
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  // Seçilen kullanıcıları izle
  const selectedOwnerId = watch("ownerId");
  const selectedProviderId = watch("providerId");

  const selectedTypeId = watch("typeId"); // seçilen typeId'yi izle


  // DeviceForm.tsx içinde onSubmit fonksiyonu
const onSubmit = async (formData: Inputs) => {
  try {
    setLoading(true);
    console.log("Gönderilen Form Verisi:", formData); // Gönderilen veriyi kontrol edelim

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        submitData.append(key, value);
      } else if (value !== undefined && value !== null) {
        submitData.append(key, String(value));
      }
    });

    console.log("FormData içeriği:", Object.fromEntries(submitData.entries())); // FormData içeriğini kontrol edelim

    const response = await fetch('/api/devices', {
      method: 'POST',
      body: submitData,
    });

    // Hata durumunu daha detaylı inceleyelim
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Server Error Response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(errorData || 'Cihaz kaydı başarısız oldu');
    }

    const result = await response.json();
    console.log("Başarılı Kayıt Sonucu:", result);

    router.refresh();
    router.push('/list/devices');
  } catch (error) {
    console.error('Detaylı Hata:', error);
    alert(error instanceof Error ? error.message : 'Cihaz kaydı sırasında bir hata oluştu!');
  } finally {
    setLoading(false);
  }
};

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">Yeni Cihaz Oluştur</h1>

      <span className="text-xs text-gray-400 font-medium">Cihaz Bilgileri</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Seri No"
          name="serialNumber"
          defaultValue={data?.serialNumber}
          register={register}
          error={errors?.serialNumber}
        />

        <DeviceTypeSelect
          register={register}
          error={errors.typeId}
          defaultValue={data?.typeId}
        />

        <DeviceFeatureSelect
          register={register}
          error={errors.featureId}
          defaultValue={data?.featureId}
          typeId={selectedTypeId} // typeId'yi prop olarak geç

        />

        <InputField
          label="Üretim Tarihi"
          name="productionDate"
          type="date"
          defaultValue={data?.productionDate}
          register={register}
          error={errors?.productionDate}
        />

        <InputField
          label="Son Kontrol Tarihi"
          name="lastControlDate"
          type="date"
          defaultValue={data?.lastControlDate}
          register={register}
          error={errors?.lastControlDate}
        />

        <InputField
          label="Son Kullanma Tarihi"
          name="expirationDate"
          type="date"
          defaultValue={data?.expirationDate}
          register={register}
          error={errors?.expirationDate}
        />

        <InputField
          label="Sonraki Kontrol Tarihi"
          name="nextControlDate"
          type="date"
          defaultValue={data?.nextControlDate}
          register={register}
          error={errors?.nextControlDate}
        />

        <InputField
          label="Konum"
          name="location"
          defaultValue={data?.location}
          register={register}
          error={errors?.location}
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Durum</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("currentStatus")}
            defaultValue={data?.currentStatus}
          >
            <option value="Aktif">Aktif</option>
            <option value="Pasif">Pasif</option>
          </select>
          {errors.currentStatus?.message && (
            <p className="text-xs text-red-400">{errors.currentStatus.message}</p>
          )}
        </div>
      </div>

      <span className="text-xs text-gray-400 font-medium">Sahiplik Bilgileri</span>
      <div className="flex justify-between flex-wrap gap-4">
            <UserSelect
                label="Cihaz Sahibi"
                register={register}
                name="ownerId"
                error={errors.ownerId}
                defaultValue={data?.ownerId}
            />

            <InstitutionSelect
                label="Sahip Kurum"
                register={register}
                name="ownerInstId"
                error={errors.ownerInstId}
                defaultValue={data?.ownerInstId}
                userId={selectedOwnerId}  // Seçilen cihaz sahibinin ID'si
            />

            <UserSelect
                label="Hizmet Sağlayıcı"
                register={register}
                name="providerId"
                error={errors.providerId}
                defaultValue={data?.providerId}
            />

            <InstitutionSelect
                label="Sağlayıcı Kurum"
                register={register}
                name="providerInstId"
                error={errors.providerInstId}
                defaultValue={data?.providerInstId}
                userId={selectedProviderId}  // Seçilen hizmet sağlayıcının ID'si
            />

        <IsgMemberSelect
          register={register}
          error={errors.isgMemberId}
          defaultValue={data?.isgMemberId}
        />
      </div>

      <InputField
        label="Detaylar"
        name="details"
        defaultValue={data?.details}
        register={register}
        error={errors?.details}
      />

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="photo">
          <Image src="/upload.png" alt="" width={28} height={28} />
          <span>Fotoğraf Yükle</span>
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          {...register("photo")}
          className="hidden"
        />
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 disabled:opacity-50 mt-4"
      >
        {loading ? "Kaydediliyor..." : type === "create" ? "Oluştur" : "Güncelle"}
      </button>
    </form>
  );
};

export default DeviceForm;