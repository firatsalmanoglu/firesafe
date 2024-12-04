import prisma from "@/lib/prisma";

const Announcements = async () => {
  const data = await prisma.announcements.findMany({
    take: 3,
    orderBy: { date: "desc" },
  });

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Duyurular</h1>
        <span className="text-xs text-gray-400">Hepsi</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[0]?.title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              {new Intl.DateTimeFormat("tr-TR").format(data[0]?.date)}
            </span>
          </div>
          <p className="text-sm text-black-400 mt-1">{data[0]?.description}</p>
        </div>
        <div className="bg-lamaPurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[1]?.title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              {new Intl.DateTimeFormat("tr-TR").format(data[1]?.date)}
            </span>
          </div>
          <p className="text-sm text-black-400 mt-1">{data[1]?.description}</p>
        </div>
        <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[2]?.title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              {new Intl.DateTimeFormat("tr-TR").format(data[2]?.date)}
            </span>
          </div>
          <p className="text-sm text-black-400 mt-1">{data[2]?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
