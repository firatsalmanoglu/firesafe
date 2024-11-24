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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">Müşteri Kurum Kartı</h1>
      <span className="text-xs text-gray-400 font-medium">Kurum</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Adı"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />

        <InputField
          label="Adresi"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors?.address}
        />

        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />

        <InputField
          label="Tel"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors?.phone}
        />

        <InputField
          label="Kayıt Tarihi"
          name="registrationDate"
          defaultValue={data?.registrationDate}
          register={register}
          type="date"
        />
      </div>

      <button 
        disabled={loading}
        className="bg-blue-400 text-white p-2 rounded-md disabled:opacity-50"
      >
        {loading ? 'Kaydediliyor...' : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default InstitutionForm;