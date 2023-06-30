import LocalGuideForm from '@/components/forms/LocalGuideForm';

type Props = {};

const Page = (props: Props) => {
  return (
    <div className='my-20'>
      <div className='text-center'>
        <h1>สมัครเป็นไกด์ท้องถิ่น</h1>
        <h2>โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน</h2>
      </div>
      <LocalGuideForm className='mt-4' />
    </div>
  );
};

export default Page;
