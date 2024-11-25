"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RoleSelect from "@/components/RoleSelect";
import InstitutionSelect from "@/components/InstitutionSelect";

const schema = z.object({
  userName: z.string()
    .min(3, { message: "Kullanıcı Adı min 3 karakter uzunluğunda olmalı!" })
    .max(20, { message: "Kullanıcı Adı maks 20 karakter uzunluğunda olmalı!" }),
  email: z.string().email({ message: "Geçersiz e-posta!" }),
  password: z.string()
    .min(8, { message: "Şifre en az 8 karakter uzunluğunda olmalı!" }),
  firstName: z.string().min(1, { message: "Ad alanı zorunludur" }),  // required olarak değiştirildi
  lastName: z.string().min(1, { message: "Soyad alanı zorunludur" }),  // required olarak değiştirildi
  bloodType: z.enum(["ARhP", "ARhN", "BRhP", "BRhN", "ABRhP", "ABRhN", "ORhP", "ORhN"]).optional(),
  birthday: z.string().optional(),
  sex: z.enum(["Erkek", "Kadin", "Diger"]).optional(),
  phone: z.string().optional(),
  photo: z.any().optional(),  // File validation'ı kaldırıldı
  institutionId: z.string().min(1, { message: "Kurum seçimi zorunludur!" }),
  roleId: z.string().min(1, { message: "Rol seçimi zorunludur!" }),
}).refine((data) => {
  // Ek validation kuralları ekleyebiliriz
  return true;
}, {
  message: "Form validation hatası"
});

type Inputs = z.infer<typeof schema>;

const UserForm = ({
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
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  

  // Form submit öncesi validation hatalarını görelim
  const onSubmit = async (formData: Inputs) => {
    console.log("Form Submit Started");
    console.log("Form Data:", formData);
    console.log("Form Errors:", errors);

    try {
      setLoading(true);

      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          submitData.append(key, value);
        } else if (value !== undefined && value !== null) {
          submitData.append(key, String(value));
        }
        console.log(`${key}:`, value); // Her bir form alanının değerini görelim
      });

      console.log("Submitting to API...");
      const response = await fetch('/api/users', {
        method: 'POST',
        body: submitData,
      });

      console.log("API Response:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error('Kullanıcı kaydı başarısız oldu: ' + errorText);
      }

      router.refresh();
      router.push('/list/users');
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Kullanıcı kaydı sırasında bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  // handleSubmit'in çalışıp çalışmadığını kontrol edelim
  console.log("Form Component Rendered");


  return (
    <form 
    className="flex flex-col gap-4" 
    onSubmit={handleSubmit((data) => {
      console.log("Form Submit Event", data);
      onSubmit(data);
    })}
  >
      <h1 className="text-xl font-semibold">Yeni Kullanıcı Oluştur</h1>

      <span className="text-xs text-gray-400 font-medium">
        Kimlik Doğrulama Bilgileri
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Kullanıcı Adı"
          name="userName"
          defaultValue={data?.userName}
          register={register}
          error={errors?.userName}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Şifre"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Kişisel Bilgiler
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Adı"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors?.firstName}
        />
        <InputField
          label="Soyadı"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors?.lastName}
        />

       {/* // Kan grubu seçimi */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Kan Grubu</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("bloodType")}
            defaultValue={data?.bloodType}
          >
            <option value="">Seçiniz</option>
            <option value="ARhP">A Rh Pozitif (A+)</option>
            <option value="ARhN">A Rh Negatif (A-)</option>
            <option value="BRhP">B Rh Pozitif (B+)</option>
            <option value="BRhN">B Rh Negatif (B-)</option>
            <option value="ABRhP">AB Rh Pozitif (AB+)</option>
            <option value="ABRhN">AB Rh Negatif (AB-)</option>
            <option value="ORhP">0 Rh Pozitif (0+)</option>
            <option value="ORhN">0 Rh Negatif (0-)</option>
          </select>
          {errors.bloodType?.message && (
            <p className="text-xs text-red-400">{errors.bloodType.message}</p>
          )}
        </div>

        <InputField
          label="Doğum Tarihi"
          name="birthday"
          type="date"
          defaultValue={data?.birthday}
          register={register}
          error={errors?.birthday}
        />

        {/* // Cinsiyet seçimi */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Cinsiyet</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="">Seçiniz</option>
            <option value="Erkek">Erkek</option>
            <option value="Kadin">Kadın</option>
            <option value="Diger">Diğer</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">{errors.sex.message}</p>
          )}
        </div>

        <InputField
          label="Telefon"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors?.phone}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Kurum ve Rol Bilgileri
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InstitutionSelect 
           label="Kurum"
           name="institutionId"  // Önemli: name prop'u formda kullanılacak field adıyla aynı olmalı
           register={register}
           error={errors.institutionId}
           defaultValue={data?.institutionId}        />
        <RoleSelect 
          register={register}
          error={errors.roleId}
          defaultValue={data?.roleId}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
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
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              // Önizleme veya başka işlemler yapılabilir
            }
          }}
        />
        {/* {errors.photo?.message && (
          <p className="text-xs text-red-400">{errors.photo.message}</p>
        )} */}
      </div>

      {/* Form validation hatalarını göstermek için */}
{Object.keys(errors).length > 0 && (
  <div className="text-red-500 text-sm">
    <p>Form hataları:</p>
    <ul>
      {Object.entries(errors).map(([key, error]) => {
        const errorMessage = error && 'message' in error ? error.message : 'Validation error';
        return (
          <li key={key}>
            {key}: {errorMessage?.toString()}
          </li>
        );
      })}
    </ul>
  </div>
)}

      <button 
        type="submit"
        disabled={loading}
        onClick={() => console.log("Submit Button Clicked")}
        className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 disabled:opacity-50 mt-4"
      >
        {loading ? "Kaydediliyor..." : type === "create" ? "Oluştur" : "Güncelle"}
      </button>
    </form>
  );
};

export default UserForm;