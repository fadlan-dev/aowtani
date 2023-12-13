import BookingInfo from '@/components/BookingInfo';
import BookingForm from '@/components/forms/BookingForm';
import { getPackage } from '@/libs/services/getPackage';
import { IPackage } from '@/types';

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const pkg: IPackage = await getPackage(params.id);
  return (
    <div className='pt-24 mb-24'>
      <center>
        <h1>ยืนยันการชำระเงิน</h1>
        <p>โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดชำระเงิน</p>
      </center>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-4 mt-4'>
          <div className='flex-1 '>
            <BookingInfo pkg={pkg} />
          </div>
          <div className='w-full lg:w-80'>
            <BookingForm pkg={pkg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
