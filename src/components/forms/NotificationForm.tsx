import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Device, NotificationType, User, Institution } from "@/lib/types";
import { toast } from "react-hot-toast";

const schema = z.object({
  serialNumber: z.string().min(1, { message: "Cihaz seri numarası zorunludur!" }),
  deviceType: z.string().min(1, { message: "Cihaz türü zorunludur!" }),
  ownerInstitution: z.string().min(1, { message: "Cihaz sahibi kurum zorunludur!" }),
  ownerPerson: z.string().min(1, { message: "Cihaz sorumlu personeli zorunludur!" }),
  providerInstitution: z.string().min(1, { message: "Hizmet sağlayıcı kurum zorunludur!" }),
  providerPerson: z.string().min(1, { message: "Hizmet sağlayıcı personeli zorunludur!" }),
  notificationType: z.string().min(1, { message: "Bildirim türü seçilmeli!" }),
  content: z.string().min(1, { message: "Bildirim içeriği zorunludur!" }),
  isRead: z.string().default("Okunmadi")
});

type FormInputs = z.infer<typeof schema>;

const NotificationForm = () => {
  const [device, setDevice] = useState<Device | null>(null);
  const [notificationTypes, setNotificationTypes] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      isRead: "Okunmadi"
    }
  });

  const serialNumber = watch("serialNumber");
  const isRead = watch("isRead");

  useEffect(() => {
    const fetchNotificationTypes = async () => {
      try {
        const response = await fetch('/api/notification-types');
        if (!response.ok) throw new Error('Bildirim türleri getirilemedi');
        const data = await response.json();
        setNotificationTypes(data);
      } catch (error) {
        console.error("Bildirim türleri çekilemedi:", error);
        toast.error("Bildirim türleri getirilemedi");
      }
    };

    fetchNotificationTypes();
  }, []);

  useEffect(() => {
    const fetchDeviceData = async () => {
      if (serialNumber?.length > 0) {
        setLoading(true);
        try {
          const response = await fetch(`/api/devices?serialNumber=${serialNumber}`);
          if (!response.ok) {
            throw new Error('Cihaz bulunamadı');
          }
          const data = await response.json();
          setDevice(data);

          // Cihaz bilgilerini form state'ine aktarın
          setValue("deviceType", data.type.name);
          setValue("ownerInstitution", data.ownerIns.name);
          setValue("ownerPerson", data.owner.userName);
          setValue("providerInstitution", data.providerIns.name);
          setValue("providerPerson", data.provider.userName);
        } catch (error) {
          console.error("Cihaz bilgileri çekilemedi:", error);
          setDevice(null);
          // Cihaz bilgilerini form state'inden temizleyin
          setValue("deviceType", "");
          setValue("ownerInstitution", "");
          setValue("ownerPerson", "");
          setValue("providerInstitution", "");
          setValue("providerPerson", "");
          toast.error("Cihaz bilgileri getirilemedi");
        } finally {
          setLoading(false);
        }
      }
    };

    const debounceTimeout = setTimeout(fetchDeviceData, 500);
    return () => clearTimeout(debounceTimeout);
  }, [serialNumber, setValue]);

  const onSubmit = async (data: FormInputs) => {
    if (!device) {
      toast.error("Lütfen geçerli bir cihaz seçin!");
      return;
    }

    try {
      const notificationData = {
        content: data.content,
        deviceId: device.id,
        deviceTypeId: device.typeId,
        creatorId: device.provider.id,
        creatorInsId: device.providerIns.id,
        recipientId: device.owner.id,
        recipientInsId: device.ownerIns.id,
        typeId: data.notificationType,
        isRead: data.isRead
      };

      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData),
      });

      if (!response.ok) {
        throw new Error('Bildirim oluşturulamadı');
      }

      toast.success("Bildirim başarıyla oluşturuldu!");
      reset(); // Formu temizle
    } catch (error) {
      console.error("Bildirim kaydedilemedi:", error);
      toast.error("Bildirim oluşturulamadı");
    }
  };

  return (
    <form className="flex flex-col gap-4 max-w-7xl mx-auto w-full" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">Bildirim Oluştur</h1>

      {/* Cihaz Bilgileri */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">Cihaz Bilgileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* Cihaz Seri No Alanı */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="serialNumber">Cihaz Seri No</Label>
            <div className="relative">
              <Input
                id="serialNumber"
                {...register("serialNumber")}
                placeholder="Cihaz seri numarası giriniz"
                disabled={loading}
              />
              {loading && (
                <div className="absolute right-2 top-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                </div>
              )}
            </div>
            {errors.serialNumber && (
              <span className="text-xs text-red-500">{errors.serialNumber.message}</span>
            )}
          </div>

          {/* Cihaz Türü Alanı */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="deviceType">Cihaz Türü</Label>
            <Input
              id="deviceType"
              value={device?.type.name ?? ""}
              readOnly
              disabled
            />
          </div>

          {/* Cihaz Sahibi Kurum Alanı */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="ownerInstitution">Cihaz Sahibi Kurum</Label>
            <Input
              id="ownerInstitution"
              value={device?.ownerIns.name ?? ""}
              readOnly
              disabled
            />
          </div>

          {/* Cihaz Sorumlu Personeli Alanı */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="ownerPerson">Cihaz Sorumlu Personeli</Label>
            <Input
              id="ownerPerson"
              value={device?.owner.userName ?? ""}
              readOnly
              disabled
            />
          </div>

          {/* Cihaz Hizmet Sağlayıcı Kurum Alanı */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="providerInstitution">Hizmet Sağlayıcı Kurum</Label>
            <Input
              id="providerInstitution"
              value={device?.providerIns.name ?? ""}
              readOnly
              disabled
            />
          </div>

          {/* Cihaz Hizmet Sağlayıcı Personeli Alanı */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="providerPerson">Hizmet Sağlayıcı Personel</Label>
            <Input
              id="providerPerson"
              value={device?.provider.userName ?? ""}
              readOnly
              disabled
            />
          </div>
        </div>
      </div>

      {/* Bildirim Detayları */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">Bildirim Detayları</h2>
        <div className="space-y-4">
          {/* Bildirim Türü Seçimi */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="notificationType">Bildirim Türü</Label>
            <select
              id="notificationType"
              {...register("notificationType")}
              className="w-full h-10 px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Bildirim türü seçin</option>
              {notificationTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {errors.notificationType && (
              <span className="text-xs text-red-500">{errors.notificationType.message}</span>
            )}
          </div>

          {/* Bildirim İçeriği Textarea */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="content">Bildirim İçeriği</Label>
            <textarea
              id="content"
              {...register("content")}
              className="w-full min-h-[100px] p-2 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Bildirim içeriğini giriniz"
            />
            {errors.content && (
              <span className="text-xs text-red-500">{errors.content.message}</span>
            )}
          </div>

          {/* Bildirim Durumu Switch */}
          <div className="flex items-center gap-2">
            <Switch
              id="isRead"
              checked={isRead === "Okundu"}
              onCheckedChange={(checked) => {
                setValue("isRead", checked ? "Okundu" : "Okunmadi");
              }}
            />
            <Label htmlFor="isRead" className="text-sm">
              {isRead === "Okundu" ? "Okundu" : "Okunmadı"}
            </Label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !device}
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors disabled:opacity-50"
      >
        {loading ? "İşlem yapılıyor..." : "Bildirim Oluştur"}
      </button>
    </form>
  );
};

export default NotificationForm;