import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Institution } from "@/lib/types";
import { toast } from "react-hot-toast";

const schema = z.object({
  tittle: z.string().min(1, { message: "Randevu başlığı zorunludur!" }),
  content: z.string().min(1, { message: "Randevu detayı zorunludur!" }),
  start: z.string().min(1, { message: "Başlangıç tarihi zorunludur!" }),
  end: z.string().min(1, { message: "Bitiş tarihi zorunludur!" }),
  creatorId: z.string().min(1, { message: "Oluşturan kullanıcı kimliği zorunludur!" }),
  creatorName: z.string().min(1, { message: "Oluşturan kullanıcı adı zorunludur!" }),
  creatorIns: z.string().min(1, { message: "Oluşturan kurum zorunludur!" }),
  recipientName: z.string().min(1, { message: "Randevuya gidilecek kişi adı zorunludur!" }),
  recipientIns: z.string().min(1, { message: "Randevuya gidilecek kurum zorunludur!" })
});

type FormInputs = z.infer<typeof schema>;

const EventForm = ({
  type,
  data
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormInputs>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      // Randevu oluşturma/güncelleme işlemini burada gerçekleştirin
      console.log(data);
      toast.success("Randevu kaydedildi!");
    } catch (error) {
      console.error("Randevu kaydedilemedi:", error);
      toast.error("Randevu kaydedilemedi");
    }
  };

  const handleCreatorIdChange = async (creatorId: string) => {
    try {
      const response = await fetch(`/api/users/${creatorId}`);
      const userData = await response.json();

      if (!response.ok) {
        throw new Error('Kullanıcı bilgileri getirilemedi');
      }

      setValue("creatorName", `${userData.firstName} ${userData.lastName}`);
      setValue("creatorIns", userData.institution.name);
    } catch (error) {
      console.error("Kullanıcı bilgileri getirilemedi:", error);
      toast.error("Kullanıcı bilgileri getirilemedi");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Randevu Kartı</h1>

      {/* Randevu Bilgileri */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">Randevu Bilgileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="tittle">Randevu Başlığı</Label>
            <Input
              id="tittle"
              {...register("tittle")}
              placeholder="Randevu başlığı giriniz"
            />
            {errors.tittle && (
              <span className="text-xs text-red-500">{errors.tittle.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="content">Randevu Detayı</Label>
            <Input
              id="content"
              {...register("content")}
              placeholder="Randevu detayı giriniz"
            />
            {errors.content && (
              <span className="text-xs text-red-500">{errors.content.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="start">Başlangıç Tarihi</Label>
            <Input
              id="start"
              type="date"
              {...register("start")}
            />
            {errors.start && (
              <span className="text-xs text-red-500">{errors.start.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="end">Bitiş Tarihi</Label>
            <Input
              id="end"
              type="date"
              {...register("end")}
            />
            {errors.end && (
              <span className="text-xs text-red-500">{errors.end.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Oluşturan Kişi Bilgileri */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">Oluşturan Kişi Bilgileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="creatorId">Oluşturan Kişi ID</Label>
            <Input
              id="creatorId"
              {...register("creatorId")}
              placeholder="Oluşturan kişi ID'sini giriniz"
              onChange={(e) => handleCreatorIdChange(e.target.value)}
            />
            {errors.creatorId && (
              <span className="text-xs text-red-500">{errors.creatorId.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="creatorName">Oluşturan Kişi Adı</Label>
            <Input
              id="creatorName"
              {...register("creatorName")}
              readOnly
              disabled
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="creatorIns">Oluşturan Kurum</Label>
            <Input
              id="creatorIns"
              {...register("creatorIns")}
              readOnly
              disabled
            />
          </div>
        </div>
      </div>

      {/* Randevuya Gidilecek Kişi Bilgileri */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">Randevuya Gidilecek Kişi Bilgileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="recipientName">Randevuya Gidilecek Kişi Adı</Label>
            <Input
              id="recipientName"
              {...register("recipientName")}
              placeholder="Randevuya gidilecek kişi adını giriniz"
            />
            {errors.recipientName && (
              <span className="text-xs text-red-500">{errors.recipientName.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="recipientIns">Randevuya Gidilecek Kurum</Label>
            <Input
              id="recipientIns"
              {...register("recipientIns")}
              placeholder="Randevuya gidilecek kurumu giriniz"
            />
            {errors.recipientIns && (
              <span className="text-xs text-red-500">{errors.recipientIns.message}</span>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors"
      >
        {type === "create" ? "Oluştur" : "Güncelle"}
      </button>
    </form>
  );
};

export default EventForm;