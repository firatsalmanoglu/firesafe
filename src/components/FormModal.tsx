"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

// USE LAZY LOADING

// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

const UserForm = dynamic(() => import("./forms/UserForm"), {
  loading: () => <h1>Loading...</h1>,
});
const CustomerForm = dynamic(() => import("./forms/CustomerForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ProviderForm = dynamic(() => import("./forms/ProviderForm"), {
  loading: () => <h1>Loading...</h1>,
});
const DeviceForm = dynamic(() => import("./forms/DeviceForm"), {
  loading: () => <h1>Loading...</h1>,
});
const MaintenanceForm = dynamic(() => import("./forms/MaintenanceForm"), {
  loading: () => <h1>Loading...</h1>,
});
const NotificationForm = dynamic(() => import("./forms/NotificationForm"), {
  loading: () => <h1>Loading...</h1>,
});
const EventForm = dynamic(() => import("./forms/EventForm"), {
  loading: () => <h1>Loading...</h1>,
});
const OfferForm = dynamic(() => import("./forms/OfferForm"), {
  loading: () => <h1>Loading...</h1>,
});

const InstitutionForm = dynamic(() => import("./forms/InstitutionForm"), {
  loading: () => <h1>Loading...</h1>,
});

const PInstitutionForm = dynamic(() => import("./forms/PInstitutionForm"), {
  loading: () => <h1>Loading...</h1>,
});

const IsgMemberForm = dynamic(() => import("./forms/IsgMemberForm"), {
  loading: () => <h1>Loading...</h1>,
});

const LogForm = dynamic(() => import("./forms/LogForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  user: (type, data) => <UserForm type={type} data={data} />,
  customer: (type, data) => <CustomerForm type={type} data={data} />,
  provider: (type, data) => <ProviderForm type={type} data={data} />,

  device: (type, data) => <DeviceForm type={type} data={data} />,
  maintenance: (type, data) => <MaintenanceForm type={type} data={data} />,
  notification: (type, data) => <NotificationForm type={type} data={data} />,
  event: (type, data) => <EventForm type={type} data={data} />,
  offer: (type, data) => <OfferForm type={type} data={data} />,
  institution: (type, data) => <InstitutionForm type={type} data={data} />,
  pinstitution: (type, data) => <PInstitutionForm type={type} data={data} />,
  isgmember: (type, data) => <IsgMemberForm type={type} data={data} />,
  log: (type, data) => <LogForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "user"
    | "device"
    | "maintenance"
    | "offer"
    | "notification"
    | "event"
    | "customer"
    | "provider"
    | "institution"
    | "pinstitution"
    | "isgmember"
    | "log"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          Tüm veriler kaybolacak. Bunu silmek istediğinizden emin misiniz?{" "}
          {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
