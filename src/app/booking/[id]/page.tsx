'use client';
import BookingInfo from '@/components/BookingInfo';
import CustomerInfo from '@/components/CustomerInfo';
import UploadSlip from '@/components/UploadSlip';
import { IPackage } from '@/types';
import { useRouter } from 'next/navigation';
// import { use } from 'react';

type Props = {
  // params: { id: string };
};

const getPackage = async (id: string): Promise<IPackage> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/packages/${id}.json`
  );
  const res = await data.json();
  return res;
};

const Page = ({}: Props) => {
  const router = useRouter();
  // const pkg: IPackage = use(getPackage(params.id));
  return (
    <div className='mt-20 mb-24'>
      <center>
        <h1>ยืนยันการชำระเงิน</h1>
        <p>โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดชำระเงิน</p>
      </center>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-4 mt-4'>
          <div className='flex-1 '>
            <BookingInfo />
          </div>
          <div className='w-full lg:w-80'>
            <CustomerInfo />
            <UploadSlip
              className='mt-4'
              onSubmit={() => router.push('/booking/success')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
