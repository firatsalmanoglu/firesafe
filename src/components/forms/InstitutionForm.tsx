"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
    name: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    address: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    email: z.string().email({ message: "Geçerli bir email adresi giriniz!" }),
    phone: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    registrationDate: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const InstitutionForm = ({
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

  const onSubmit = async (data: Inputs) => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/institutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Kayıt işlemi başarısız oldu');
      }

      router.refresh();
      router.push('/list/institutions'); // veya başka bir sayfaya yönlendirme
    } catch (error) {
      console.error('Error:', error);
      // Hata mesajını kullanıcıya gösterebilirsiniz
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 max-w-7xl mx-auto w-full" onSubmit={handleSubmit(onSubmit)}>
   <h1 className="text-xl font-semibold">Müşteri Kurum Kartı</h1>

   {/* Kurum Bilgileri */}
   <div className="space-y-4">
       <h2 className="text-sm font-medium text-gray-500">Kurum Bilgileri</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
           <div className="flex flex-col gap-2">
               <label className="text-xs text-gray-500">Adı</label>
               <input
                   type="text"
                   {...register("name")}
                   defaultValue={data?.name}
                   className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
               />
               {errors?.name && (
                   <span className="text-xs text-red-500">{errors.name.message}</span>
               )}
           </div>

           <div className="flex flex-col gap-2">
               <label className="text-xs text-gray-500">Adresi</label>
               <input
                   type="text"
                   {...register("address")}
                   defaultValue={data?.address}
                   className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
               />
               {errors?.address && (
                   <span className="text-xs text-red-500">{errors.address.message}</span>
               )}
           </div>

           <div className="flex flex-col gap-2">
               <label className="text-xs text-gray-500">Email</label>
               <input
                   type="email"
                   {...register("email")}
                   defaultValue={data?.email}
                   className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
               />
               {errors?.email && (
                   <span className="text-xs text-red-500">{errors.email.message}</span>
               )}
           </div>

           <div className="flex flex-col gap-2">
               <label className="text-xs text-gray-500">Tel</label>
               <input
                   type="text"
                   {...register("phone")}
                   defaultValue={data?.phone}
                   className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
               />
               {errors?.phone && (
                   <span className="text-xs text-red-500">{errors.phone.message}</span>
               )}
           </div>

           <div className="flex flex-col gap-2">
               <label className="text-xs text-gray-500">Kayıt Tarihi</label>
               <input
                   type="date"
                   {...register("registrationDate")}
                   defaultValue={data?.registrationDate}
                   className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
               />
               {errors?.registrationDate && (
                   <span className="text-xs text-red-500">{errors.registrationDate.message}</span>
               )}
           </div>
       </div>
   </div>

   <button 
       type="submit"
       disabled={loading}
       className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors disabled:opacity-50 mt-4"
   >
       {loading ? 'Kaydediliyor...' : type === "create" ? "Oluştur" : "Güncelle"}
   </button>
</form>
  );
};

export default InstitutionForm;