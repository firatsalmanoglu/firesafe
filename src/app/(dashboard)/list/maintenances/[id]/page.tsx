import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import FormModal from "@/components/FormModal";
//import Performance from "@/components/Performance";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import {
  Institutions,
  Users,
  DeviceFeatures,
  Devices,
  DeviceTypes,
  MaintenanceCards,
  Services,
  Operations,
} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SingleMaintenancePage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const maintenanceId = id; // veya Number(id);
  const maintenance: (MaintenanceCards & {
    device: Devices;
    deviceType: DeviceTypes;
    deviceFeature: DeviceFeatures;
    provider: Users;
    providerIns: Institutions;
    customer: Users;
    customerIns: Institutions;
    MaintenanceSub: {
        id: string;
        maintenanceCardId: string;
        operationId: string;
        detail: string | null;
        opreation: Operations;
    }[];
}) | null = await prisma.maintenanceCards.findUnique({
  where: { id: maintenanceId },
  include: {
      device: true,
      deviceType: true,
      deviceFeature: true,
      provider: true,
      providerIns: true,
      customer: true,
      customerIns: true,
      MaintenanceSub: {
          include: {
              opreation: true
          }
      }
  },
});

  if (!maintenance) {
    return notFound();
  }
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaPurpleLight py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Bakım Kartı</h1>
                {role === "admin" && (
                  <FormModal
                    table="maintenance"
                    type="update"
                    data={{
                      id: 1,
                      recordID: "005",
                      deviceSerialNumber: "125487",
                      performedById: "196587",
                      performedByName: "Ayhan Uğur",
                      instPerformed: "KSKS Yangın Güvenlik Ltd.",
                      customerId: "5858475",
                      customerName: "Ali Abalı",
                      instServed: "AAA Tarım Sanayi A.Ş.",
                      maintenanceDate: "13/07/2023",
                      maintenanceType: "Bakım",
                      details: "Basınçlar kontrol edildi",
                      nexyMaintenanceDate: "13/07/2024",
                      status: "OK",
                    }}
                  />
                )}
              </div>
              <p className="text-sm text-gray-500">{maintenance.details}</p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-2/3 flex items-center gap-2">
                  {/* <Image src="/blood.png" alt="" width={14} height={14} /> */}
                  <span>Bakım No: {maintenance.id}</span>
                </div>

                <div className="w-full md:w-1/3 lg:w-full 2xl:w-2/3 flex items-center gap-2">
                  {/* <Image src="/blood.png" alt="" width={14} height={14} /> */}
                  <span>Cihaz Seri No: {maintenance.device.serialNumber}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-2/3 flex items-center gap-2">
                  {/* <Image src="/person.png" alt="" width={14} height={14} /> */}
                  <span>
                    Cihaz Sorumlusu:{" "}
                    {maintenance.customer.firstName +
                      " " +
                      maintenance.customer.lastName}
                  </span>
                </div>

                <div className="w-full md:w-1/3 lg:w-full 2xl:w-2/3 flex items-center gap-2">
                  {/* <Image src="/person.png" alt="" width={14} height={14} /> */}
                  <span> Cihaz Sahibi: {maintenance.customerIns.name} </span>
                </div>

                <div className="w-full md:w-1/3 lg:w-full 2xl:w-2/3 flex items-center gap-2">
                  {/* <Image src="/fire-extinguisher.png" alt="" width={14} height={14} /> */}
                  <span> Türü: {maintenance.deviceType.name}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-2/3 flex items-center gap-2">
                  {/* <Image src="/feature.png" alt="" width={14} height={14} /> */}
                  <span> Özelliği: {maintenance.deviceFeature.name}</span>
                </div>

                <div className="w-full md:w-1/3 lg:w-full 2xl:w-2/3 flex items-center gap-2">
                  <Image src="/address.png" alt="" width={14} height={14} />
                  <span> {maintenance.customerIns.address}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-lamaSky p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[100%]">
              {/* <div className="bg-lamaPurpleLight p-4 rounded-md w-full xl:w-2/5 flex flex-col gap-4"> */}

              <Image
                src="/smc-company.png"
                alt=""
                width={96}
                height={96}
                className="w-10 h-12"
              />
              <div className="">
                <h1 className="text-md font-semibold">Hizmet Veren Firma</h1>
                <span className="text-sm text-gray-400">
                  {maintenance.provider.firstName +
                    " " +
                    maintenance.provider.lastName}
                </span>
                <br></br>
                <span className="text-sm text-gray-400">
                  {maintenance.providerIns.name}
                </span>
              </div>
            </div>
            {/* CARD */}
            {/* <div className="bg-lamaPurpleLight p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[100%]"> */}
            {/* <div className="bg-lamaPurpleLight p-4 rounded-md w-full xl:w-2/5 flex flex-col gap-4"> */}

            {/* <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-md font-semibold">Bakım Yapan Firma</h1>
                <span className="text-sm text-gray-400">10/12/2023</span>
              </div>
            </div> */}
            {/* CARD */}
            <div className="bg-lamaYellow p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[100%]">
              {/* <div className="bg-lamaPurpleLight p-4 rounded-md w-full xl:w-2/5 flex flex-col gap-4"> */}

              <Image
                src="/smc-calendar.png"
                alt=""
                width={96}
                height={96}
                className="w-10 h-10"
              />
              <div className="">
                <h1 className="text-md font-semibold">Bakım Tarihi</h1>
                <span className="text-sm text-gray-400">
                  {maintenance.maintenanceDate.toLocaleDateString()}
                </span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-lamaSky p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[100%]">
              {/* <div className="bg-lamaPurpleLight p-4 rounded-md w-full xl:w-2/5 flex flex-col gap-4"> */}

              <Image
                src="/smc-calendar.png"
                alt=""
                width={96}
                height={96}
                className="w-10 h-10"
              />
              <div className="">
                <h1 className="text-md font-semibold">Sonraki Bakım Tarihi</h1>
                <span className="text-sm text-gray-400">
                  {maintenance.nextMaintenanceDate.toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* CARD */}
            {/* <div className="bg-lamaYellow p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[100%]"> */}
              {/* <div className="bg-lamaPurpleLight p-4 rounded-md w-full xl:w-2/5 flex flex-col gap-4"> */}

              {/* <Image
                src="/smc-maintenance.png"
                alt=""
                width={96}
                height={96}
                className="w-10 h-10"
              />
              <div className="">
                <h1 className="text-md font-semibold">Bakım Türü</h1>
                <span className="text-sm text-gray-400">
                  {maintenance.type.name}
                </span>
              </div>
            </div> */}

            {/* CARD */}
            {/* <div className="bg-lamaSky p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[100%]"> */}
            {/* <div className="bg-lamaPurpleLight p-4 rounded-md w-full xl:w-2/5 flex flex-col gap-4"> */}

            {/* <Image
                src="/smc-status.png"
                alt=""
                width={96}
                height={96}
                className="w-10 h-10"
              /> */}
            {/* <div className="">
                <h1 className="text-md font-semibold">Durumu</h1>
                <span className="text-sm text-gray-400">Gerek Var mı?</span>
              </div> */}
            {/* </div> */}
          </div>
        </div>
        {/* BOTTOM */}
        {/* <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1 className="text-xl font-semibold">Cihaz Bakım Takvimi</h1>
          <BigCalendar />
        </div> */}
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
    <h1 className="text-xl font-semibold">Bakım İşlemleri</h1>
    <div className="flex flex-col gap-4 mt-4">
        {maintenance.MaintenanceSub.map((sub) => (
            <div key={sub.id} className="bg-lamaSkyLight rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">{sub.opreation.name}</h2>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                    {sub.detail || 'Detay girilmemiş'}
                </p>
            </div>
        ))}
    </div>
</div>
    </div>
  );
};

export default SingleMaintenancePage;
