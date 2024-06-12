'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { DatePicker } from "antd";
import Image from "next/image";
import { getApodData } from "@/service/apodService";

interface NasaData {

}

export default function Home() {
  const [strDate, setStrDate] = useState<string>('');
  const [dataaop, setDataAop] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (strDate) {
      const fetchData = async () => {
        const [year, month] = strDate.split('-').map(Number);
        const startDate = `${year}-${month}-01`;
        const endDate = `${year}-${month}-${new Date(year, month, 0).getDate()}`;
        setIsLoading(true);
        const response = await getApodData(startDate, endDate);
        setDataAop(response);
        setIsLoading(false);
      };
      fetchData();
    }
  };

  const renderVideoorImage = (data: any) => {
    if (data.media_type === 'video') {
      return (
        <iframe
          src={data.url}
          title={data.title}
          className="w-96"
          width={0}
          height={0}
        />
      );
    }
    return (
      <Image
        src={data.url}
        alt={data.title}
        width={300}
        height={300}
        loading="lazy"
      />
    );
  }


  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <h1 className=" text-3xl font-bold ">Nasa Picture of the day</h1>
      <div>
        <form onSubmit={handleSubmit} className="flex items-center gap-4 ">
          <DatePicker picker="month" onChange={(date, dateString) => {
            if (typeof dateString === 'string') {
              setStrDate(dateString);
            } else {
              setStrDate(dateString[0]);
            }
          }} />
          <button type="submit" className="border-2 rounded-lg p-2">Submit</button>
        </form>
      </div>
      {!isLoading ? (
        <div>
          {dataaop ? (
            <div className="grid grid-cols-4 gap-12 ">
              {dataaop.map((data: any) => (
                <div key={data.date} className="flex flex-col gap-4 w-[300px] p-4 border-2 rounded-xl justify-between h-[55vh]">
                  <div className="h-[55vh] overflow-hidden">
                    {renderVideoorImage(data)}
                  </div>

                  <div className="flex flex-col gap-4">
                    <p>{data.date}</p>
                    <h2 className="text-xl font-bold">{data.title}</h2>
                    <Link legacyBehavior href={`/photoday/${data.date}`}  >
                      <a className="p-2 border-2 text-center rounded-xl">View Detail</a>
                    </Link>
                  </div>



                </div>
              ))}
            </div>
          ) : (
            <div>

            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}

    </main>
  );
}
