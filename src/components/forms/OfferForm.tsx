"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
offerId: z
  .string()
  .min(3, { message: "Bu alan min 3 karakter uzunluğunda olmalı!" })
  .max(20, { message: "Bu alan maks 20 karakter uzunluğunda olmalı!" }),
providerId: z
  .string()
  .min(3, { message: "Bu alan min 3 karakter uzunluğunda olmalı!" })
  .max(20, { message: "Bu alan maks 20 karakter uzunluğunda olmalı!" }),
providerName: z
  .string()
  .min(1, { message: "Bu alan boş geçilemez!" }),
providerOrganization: z
  .string()
  .min(1, { message: "Bu alan boş geçilemez!" }),
phone: z
  .string()
  .min(1, { message: "Bu alan boş geçilemez!" }),
email: z
  .string()
  .min(1, { message: "Bu alan boş geçilemez!" }),
address: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
ownerId: z
  .string()
  .min(1, { message: "Bu alan boş geçilemez!" }),
ownerName: z
  .string()
  .min(1, { message: "Bu alan boş geçilemez!" }),
ownerOrganization: z
  .string()
  .min(1, { message: "Bu alan boş geçilemez!" }),
ownerAddress: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
ownerPhone: z
  .string()
  .min(1, { message: "Bu alan boş geçilemez!" }),
ownerEmail: z
  .string()
  .min(1, { message: "Bu alan boş geçilemez!" }),
projectLocation: z
  .string()
  .min(1, { message: "Bu alan boş geçilemez!" }),
projectSize: z
  .string()
  .min(1, { message: "Bu alan boş geçilemez!" }),
offerDate: z.
  date({ message: "Bu alan boş geçilemez!" }),
expiryDate: z.
  date({ message: "Bu alan boş geçilemez!" }),
unitPrice: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
amount: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
paymentTerms: z
  .enum(["TP", "3VD", "6VD", "9VD"], { message: "Bu alan boş geçilemez!" }),
servicesOffered: z
  .enum(["BK", "US", "DN"], { message: "Bu alan boş geçilemez!" }),
status: z
  .string().min(1, { message: "Bu alan boş geçilemez!" }),
offerDetails: z.string().min(1, { message: "Bu alan boş geçilemez!" }),

});

type Inputs = z.infer<typeof schema>;

const OfferForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-2 w-full" onSubmit={onSubmit} >
      <h1 className="text-xl font-semibold">Teklif Kartı</h1>
      <span className="text-xs text-gray-400 font-medium">
        Teklif  
      </span>
      <div className="flex justify-between flex-wrap gap-2 w-full">
        <InputField
          label="ID"
          name="offerId"
          defaultValue={data?.offerId}
          register={register}
          error={errors?.offerId}
        />

        <InputField
          label="Tarihi"
          name="offerDate"
          type="date"
          defaultValue={data?.offerDate}
          register={register}
          error={errors?.offerDate}
        />

        <InputField
          label="Geçerlilik Tarihi"
          name="expiryDate"
          type="date"
          defaultValue={data?.expiryDate}
          register={register}
          error={errors?.expiryDate}
        />
        
        <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Hizmet</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("servicesOffered")}
              defaultValue={data?.servicesOffered}
            >
              <option value="BK">Bakım</option>
              <option value="US">Ürün Satışı</option>
              <option value="DN">Danışmanlık</option>

            </select>
            {errors.servicesOffered?.message && (
              <p className="text-xs text-red-400">
                {errors.servicesOffered.message.toString()}
              </p>
            )}
        </div>

        <InputField
          label="Miktar"
          name="projectSize"
          defaultValue={data?.projectSize}
          register={register}
          error={errors?.projectSize}
        />

        <InputField
          label="Birim Fiyat"
          name="unitPrice"
          defaultValue={data?.unitPrice}
          register={register}
          error={errors?.unitPrice}
        />
        <InputField
          label="Toplam Fiyat"
          name="amount"
          defaultValue={data?.amount}
          register={register}
          error={errors?.amount}
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Ödeme Türü</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("paymentTerms")}
              defaultValue={data?.paymentTerms}
            >
              <option value="TP">Teslimatta Peşin</option>
              <option value="3VD">3 Ay Vadeli</option>
              <option value="6VD">6 Ay Vadeli</option>
              <option value="9VD">9 Ay Vadeli</option>

            </select>
            {errors.paymentTerms?.message && (
              <p className="text-xs text-red-400">
                {errors.paymentTerms.message.toString()}
              </p>
            )}
          </div>

        <InputField
          label="Durumu"
          name="status"
          defaultValue={data?.status}
          register={register}
          error={errors?.status}
        /> 
          
        <InputField
          label="Teslimat Yeri"
          name="projectLocation"
          defaultValue={data?.projectLocation}
          register={register}
          error={errors?.projectLocation}
        />
        <InputField
          label="Detaylar"
          name="offerDetails"
          defaultValue={data?.offerDetails}
          register={register}
          error={errors?.offerDetails}
        />        
        </div>
        <span className="text-xs text-gray-400 font-medium">
          Teklifi Veren
        </span>
      <div className="flex justify-between flex-wrap gap-2">
        <InputField
          label="ID"
          name="providerId"
          defaultValue={data?.providerId}
          register={register}
          error={errors?.providerId}
        />
        <InputField
          label="Personel"
          name="providerName"
          defaultValue={data?.providerName}
          register={register}
          error={errors?.providerName}
        />
        <InputField
          label="Firma"
          name="providerOrganization"
          defaultValue={data?.providerOrganization}
          register={register}
          error={errors?.providerOrganization}
        />
        <InputField
          label="Tel"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors?.phone}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Adres"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors?.address}
        />
    </div>
        <span className="text-xs text-gray-400 font-medium">
          Müşteri
        </span>
    <div className="flex justify-between flex-wrap gap-2">
          
        <InputField
          label="ID"
          name="ownerId"
          defaultValue={data?.ownerId}
          register={register}
          error={errors?.ownerId}
        />
        <InputField
          label="Personel Adı"
          name="ownerName"
          defaultValue={data?.ownerName}
          register={register}
          error={errors?.ownerName}
        />
        <InputField
          label="Firma"
          name="ownerOrganization"
          defaultValue={data?.ownerOrganization}
          register={register}
          error={errors?.ownerOrganization}
        />
        <InputField
          label="Tel"
          name="ownerPhone"
          defaultValue={data?.ownerPhone}
          register={register}
          error={errors?.ownerPhone}
        />
        <InputField
          label="Email"
          name="ownerEmail"
          defaultValue={data?.ownerEmail}
          register={register}
          error={errors?.ownerEmail}
        />
        <InputField
          label="Adres"
          name="ownerAddress"
          defaultValue={data?.ownerAddress}
          register={register}
          error={errors?.ownerAddress}
        />
        
        {/* <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Foto Yükleyin</span>
          </label>
          <input type="file" id="img" {...register("photo")} className="hidden" />
          {errors.photo?.message && (
            <p className="text-xs text-red-400">
              {errors.photo.message.toString()}
            </p>
          )}
        </div> */}

      </div>
      
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default OfferForm;