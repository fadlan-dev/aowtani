import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  id: string | number;
};

const NewsItem = ({ id }: Props) => {
  const router = useRouter();
  return (
    <li
      className='border-zinc-100 border-solid rounded cursor-pointer'
      onClick={() => router.push(`/news/${id}`)}
    >
      <div className=' aspect-video bg-zinc-100' />
      <div className='p-4'>
        <h2 className='text-lg text-primary font-bold'>
          สถานที่ท่องเที่ยว สุดเจ๋ง
        </h2>
        <p className='mt-2 line-clamp-2 overflow-hidden'>
          ตำบลบางปู เล่ากันว่าหมู่บ้านแห่งนี้เดิมๆอยู่ริมทะเล
          (อ่าว)ในทะเลมีปลาชุกชุมชาวบ้านประกอบอาชีพประมงน้ำตื้น
          ทุกครอบครัวจะมีเรือและเครื่องมือจับปลาลักษณะเดี๋ยวนี้ก็ยังมีอย
        </p>
      </div>
    </li>
  );
};

export default NewsItem;
