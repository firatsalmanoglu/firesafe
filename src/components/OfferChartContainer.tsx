import Image from "next/image"
import OfferChart from "./OfferChart"
import prisma from "@/lib/prisma"

const OfferChartContainer = async () => {

    const today = new Date ()
    const dayOfWeek = today.getDay()
    const daySinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek-1;

    const lastMonday = new Date (today);

    lastMonday.setDate(today.getDate() - daySinceMonday);



     const resData = await prisma.offerCards.findMany({
         where: {
            offerDate: {
                gte: lastMonday,
            },
         },
         select:{
            offerDate:true,
            status:true,
         },
     })

     //console.log (data)
     const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

     const offerMap : { [key: string] : {kabul: number ; red: number; beklemede:number} }= 
     {
        Mon: {kabul:0, red:0, beklemede:0},
        Tue: {kabul:0, red:0, beklemede:0},
        Wed: {kabul:0, red:0, beklemede:0},
        Thu: {kabul:0, red:0, beklemede:0},
        Fri: {kabul:0, red:0, beklemede:0},
     };

     resData.forEach(item=>{
        const itemDate = new Date(item.offerDate)

        if (dayOfWeek >=1 && dayOfWeek <=5) {
            const dayName = daysOfWeek [dayOfWeek-1];   
            
            if (item.status==="Onaylandi") {offerMap[dayName].kabul += 1;} 
            if (item.status==="Red") {offerMap[dayName].red += 1;} 
            if (item.status==="Beklemede") {offerMap[dayName].beklemede += 1;} 
        }
     });

     const data = daysOfWeek.map ((day) => ({
        name: day,
        kabul: offerMap[day].kabul,
        red: offerMap[day].red,
        beklemede: offerMap[day].beklemede,
     }));

    return (
        <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Teklifler/Kabul Edilenler</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <OfferChart data={data}/>
      </div>
    )
}

export default OfferChartContainer