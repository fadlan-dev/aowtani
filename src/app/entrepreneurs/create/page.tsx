import EntrepreneursForm from '@/components/forms/EntrepreneursForm';

type Props = {};

export const metadata = {
  title: 'สมัครเป็นผู้ประกอบการ',
};

const Page = (props: Props) => {
  return (
    <div className='my-20'>
      <div className='text-center'>
        <h1>สมัครเป็นผู้ประกอบการ</h1>
        <h2>โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน</h2>
      </div>
      <EntrepreneursForm className='mt-4' />
    </div>
  );
};

export default Page;
