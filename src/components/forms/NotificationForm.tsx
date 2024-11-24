"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({

    notificationId: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    userId: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    userName: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    //organizationName: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    deviceSerialNumber:z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    deviceOwnerId:z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    deviceOwner:z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    message: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    notificationDate: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    isRead: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    notificationType: z.enum(["D", "B", "H"], { message: "Bu alan boş geçilemez!" }),
    

});

type Inputs = z.infer<typeof schema>;

const NotificationForm = ({
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
      <h1 className="text-xl font-semibold">Bildirim Kartı</h1>
      <span className="text-xs text-gray-400 font-medium">
       Bildirim
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="No"
          name="notificationId"
          defaultValue={data?.notificationId}
          register={register}
          error={errors?.notificationId}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Türü</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("notificationType")}
            defaultValue={data?.notificationType}
          >
            <option value="D">Duyuru</option>
            <option value="B">Bakım</option>
            <option value="H">Hatırlatma</option>
          </select>
          {errors.notificationType?.message && (
            <p className="text-xs text-red-400">
              {errors.notificationType.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Tarihi"
          name="notificationDate"
          type= "date"
          defaultValue={data?.notificationDate}
          register={register}
          error={errors?.notificationDate}
        />
        <InputField
          label="Bildirim"
          name="message"
          defaultValue={data?.message}
          register={register}
          error={errors?.message}
        />
        <InputField
          label="Durumu"
          name="isRead"
          defaultValue={data?.isRead}
          register={register}
          error={errors?.isRead}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        İlgili Kullanıcı
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="ID"
          name="userId"
          defaultValue={data?.userId}
          register={register}
          error={errors?.userId}
        />
        <InputField
          label="Adı"
          name="userName"
          defaultValue={data?.userName}
          register={register}
          error={errors?.userName}
        />

        {/* <InputField
          label="Kurum"
          name="organizationName"
          defaultValue={data?.organizationName}
          register={register}
          error={errors?.organizationName}
        /> */}
      </div>
      <span className="text-xs text-gray-400 font-medium">
        İlgili Cihaz
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Seri No"
          name="deviceSerialNumber"
          defaultValue={data?.deviceSerialNumber}
          register={register}
          error={errors?.deviceSerialNumber}
        />
        <InputField
          label="Sahibi ID"
          name="deviceOwnerId"
          defaultValue={data?.deviceOwnerId}
          register={register}
          error={errors?.deviceOwnerId}
        />
        <InputField
          label="Sahibi Kurum"
          name="deviceOwner"
          defaultValue={data?.deviceOwner}
          register={register}
          error={errors?.deviceOwner}
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

export default NotificationForm;