'use client';
import { getApodDetail } from '@/service/apodService';
import axios from 'axios';
import { useState, useEffect } from 'react';

type dataAop = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}


export default function Page({ params }: { params: { slug: string } }) {
  const [dataAop, setDataAop] = useState<dataAop>();
  useEffect(() => {

    const fetchData = async () => {
      const date = params.slug;

      //check string date  format is valid ex "2000-01-01"
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        console.error('Invalid date format');
        return;
      }
      const response = await getApodDetail(date);
      setDataAop(response)
    };

    fetchData();
  });


  return (
    <>

      {dataAop ? (
        <div className='flex flex-col px-36 py-16 items-center gap-6'>
          <img src={dataAop.hdurl} alt={dataAop.title} className='w-[50vw]'/>
          <h1 className='text-xl font-bold'>{dataAop.title}</h1>
          <p>{dataAop.explanation}</p>


          <div className='mt-36 w-full'>
            <p>Detail</p>
            <p>Date: {dataAop.date}</p>
            <p>Media Type: {dataAop.media_type}</p>
            <p>Service Version: {dataAop.service_version}</p>
            <p>HD URL: {dataAop.hdurl}</p>

            <button  className=' mt-12 p-4 border-2 rounded-md' onClick={() => window.history.back()}>Back</button>
          </div>

        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>

  )
}