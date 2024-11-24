"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({

    recordID: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    deviceSerialNumber: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    performedById: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    performedByName: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    instPerformed:z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    customerId:z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    customerName:z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    instServed: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    maintenanceDate: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    maintenanceType: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    details: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    nexyMaintenanceDate: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    status: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    check1:z.literal(true, { message: "Şartları kabul etmelisiniz!" }),
    check2:z.literal(true, { message: "Şartları kabul etmelisiniz!" }),
    check3:z.literal(true, { message: "Şartları kabul etmelisiniz!" }),
    check4:z.literal(true, { message: "Şartları kabul etmelisiniz!" }),
    check5:z.literal(true, { message: "Şartları kabul etmelisiniz!" }),
    check6:z.literal(true, { message: "Şartları kabul etmelisiniz!" }),
    check7:z.literal(true, { message: "Şartları kabul etmelisiniz!" }),
    check8:z.literal(true, { message: "Şartları kabul etmelisiniz!" }),


});

type Inputs = z.infer<typeof schema>;

const MaintenanceForm = ({
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
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Bakım Kartı</h1>
      <span className="text-xs text-gray-400 font-medium">
       Bakım
      </span>
      <div className="flex justify-between flex-wrap gap-4">
      
        <InputField
          label="No"
          name="recordID"
          defaultValue={data?.recordID}
          register={register}
          error={errors?.recordID}
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Türü</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("maintenanceType")}
            defaultValue={data?.maintenanceType}
          >
            <option value="BK">Basınç Kontrolü</option>
            <option value="CD">Değişim</option>
            <option value="TM">Tamir</option>
          </select>
          {errors.maintenanceType?.message && (
            <p className="text-xs text-red-400">
              {errors.maintenanceType.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Tarihi"
          name="maintenanceDate"
          type= "date"
          defaultValue={data?.maintenanceDate}
          register={register}
          error={errors?.maintenanceDate}
        />
        <InputField
          label="Detayları"
          name="details"
          defaultValue={data?.details}
          register={register}
          error={errors?.details}
        />

        <InputField
          label="Sonraki Bakım Tarihi"
          name="nexyMaintenanceDate"
          type= "date"
          defaultValue={data?.nexyMaintenanceDate}
          register={register}
          error={errors?.nexyMaintenanceDate}
        />

        <InputField
          label="Durumu"
          name="status"
          defaultValue={data?.status}
          register={register}
          error={errors?.status}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="check1"
            {...register("check1", { required: "Bu alan zorunludur" })}
          />
          <label htmlFor="check1" className="ml-2 text-sm text-gray-600">
            Basınç Kontrolü
          </label>
          {errors.check1?.message && (
            <p className="text-xs text-red-400">
              {errors.check1.message.toString()}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="check2"
            {...register("check2", { required: "Bu alan zorunludur" })}
          />
          <label htmlFor="check2" className="ml-2 text-sm text-gray-600">
            XXX Kontrolü
          </label>
          {errors.check2?.message && (
            <p className="text-xs text-red-400">
              {errors.check2.message.toString()}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="check3"
            {...register("check3", { required: "Bu alan zorunludur" })}
          />
          <label htmlFor="check3" className="ml-2 text-sm text-gray-600">
            YYY Kontrolü
          </label>
          {errors.check3?.message && (
            <p className="text-xs text-red-400">
              {errors.check3.message.toString()}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="check4"
            {...register("check4", { required: "Bu alan zorunludur" })}
          />
          <label htmlFor="check4" className="ml-2 text-sm text-gray-600">
            Basınç Kontrolü
          </label>
          {errors.check4?.message && (
            <p className="text-xs text-red-400">
              {errors.check4.message.toString()}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="check5"
            {...register("check5", { required: "Bu alan zorunludur" })}
          />
          <label htmlFor="check5" className="ml-2 text-sm text-gray-600">
            XXX Kontrolü
          </label>
          {errors.check5?.message && (
            <p className="text-xs text-red-400">
              {errors.check5.message.toString()}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="check6"
            {...register("check6", { required: "Bu alan zorunludur" })}
          />
          <label htmlFor="check6" className="ml-2 text-sm text-gray-600">
            YYY Kontrolü
          </label>
          {errors.check6?.message && (
            <p className="text-xs text-red-400">
              {errors.check6.message.toString()}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="check7"
            {...register("check7", { required: "Bu alan zorunludur" })}
          />
          <label htmlFor="check7" className="ml-2 text-sm text-gray-600">
            XXX Kontrolü
          </label>
          {errors.check7?.message && (
            <p className="text-xs text-red-400">
              {errors.check7.message.toString()}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="check8"
            {...register("check8", { required: "Bu alan zorunludur" })}
          />
          <label htmlFor="check8" className="ml-2 text-sm text-gray-600">
            YYY Kontrolü
          </label>
          {errors.check8?.message && (
            <p className="text-xs text-red-400">
              {errors.check8.message.toString()}
            </p>
          )}
        </div>
            

        </div>
        <span className="text-xs text-gray-400 font-medium">
          Cihaz
        </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Seri No"
          name="deviceSerialNumber"
          defaultValue={data?.deviceSerialNumber}
          register={register}
          error={errors?.deviceSerialNumber}
        />
        </div>
        <span className="text-xs text-gray-400 font-medium">
          Bakım Personeli
        </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="ID"
          name="performedById"
          defaultValue={data?.performedById}
          register={register}
          error={errors?.performedById}
        />

        <InputField
          label="Adı"
          name="performedByName"
          defaultValue={data?.performedByName}
          register={register}
          error={errors?.performedByName}
        />

        <InputField
          label="Kurumu"
          name="instPerformed"
          defaultValue={data?.instPerformed}
          register={register}
          error={errors?.instPerformed}
        />
        </div>
        <span className="text-xs text-gray-400 font-medium">
          Hizmet Verilen Firma
        </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Sorumlu Personel ID"
          name="customerId"
          defaultValue={data?.customerId}
          register={register}
          error={errors?.customerId}
        />
        <InputField
          label="Sorumlu Personel Adı"
          name="customerName"
          defaultValue={data?.customerName}
          register={register}
          error={errors?.customerName}
        />
        <InputField
          label="Firma"
          name="instServed"
          defaultValue={data?.instServed}
          register={register}
          error={errors?.instServed}
        />

       
       
        {/* <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Foto Yükleyin</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
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

export default MaintenanceForm;