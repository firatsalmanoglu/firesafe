"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
    
    eventId: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    creatorId: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    creatorName: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    creatorOrganization: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    respPersonId:z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    respPersonName:z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    respPersonOrg:z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    title: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    message: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    //notificationType: z.enum(["D", "B", "H"], { message: "Bu alan boş geçilemez!" }),
    start:z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    end: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    create: z.string().min(1, { message: "Bu alan boş geçilemez!" }),
    allDay: z.string().min(1, { message: "Bu alan boş geçilemez!" }),

});

type Inputs = z.infer<typeof schema>;

const EventForm = ({
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
      <h1 className="text-xl font-semibold">Randevu Kartı</h1>
      <span className="text-xs text-gray-400 font-medium">
       Randevu
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="No"
          name="eventId"
          defaultValue={data?.eventId}
          register={register}
          error={errors?.eventId}
        />
        <InputField
          label="Randevu Başlığı"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Detay"
          name="message"
          defaultValue={data?.message}
          register={register}
          error={errors?.message}
        />

        <InputField
          label="Başlangıç Tarihi"
          name="start"
          type= "date"
          defaultValue={data?.start}
          register={register}
          error={errors?.start}
        />
        <InputField
          label="Bitiş Tarihi"
          name="end"
          type= "date"
          defaultValue={data?.end}
          register={register}
          error={errors?.end}
        />
        <InputField
          label="Oluşturma Tarihi"
          name="create"
          type= "date"
          defaultValue={data?.create}
          register={register}
          error={errors?.create}
        />
         <InputField
          label="Durumu"
          name="allDay"
          defaultValue={data?.allDay}
          register={register}
          error={errors?.allDay}
        />

      </div>
      <span className="text-xs text-gray-400 font-medium">
        Randevuyu Oluşturan Kişi
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="ID"
          name="creatorId"
          defaultValue={data?.creatorId}
          register={register}
          error={errors?.creatorId}
        />
        <InputField
          label="Adı"
          name="creatorName"
          defaultValue={data?.creatorName}
          register={register}
          error={errors?.creatorName}
        />

        <InputField
          label="Kurumu"
          name="creatorOrganization"
          defaultValue={data?.creatorOrganization}
          register={register}
          error={errors?.creatorOrganization}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Randevuya Gidecek Olan Kişi
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="ID"
          name="respPersonId"
          defaultValue={data?.respPersonId}
          register={register}
          error={errors?.respPersonId}
        />
        <InputField
          label="Adı"
          name="respPersonName"
          defaultValue={data?.respPersonName}
          register={register}
          error={errors?.respPersonName}
        />
        <InputField
          label="Kurum"
          name="respPersonOrg"
          defaultValue={data?.respPersonOrg}
          register={register}
          error={errors?.respPersonOrg}
        />
                
        {/* <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Bildirim Türü</label>
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
        </div> */}

       
       
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

export default EventForm;