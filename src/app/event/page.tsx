import Calendar from '@/components/ui/calendar';

type Props = {};
const Page = ({}: Props) => {
  return (
    <div className='pt-24 mb-24'>
      <center>
        <h1>ปฎิทินกิจกรรม</h1>
        <p>กิจกรรมดีๆ ที่ไม่ควรพลาด</p>
        <div className='container max-w-3xl'>
          <Calendar className=' mt-4' />
        </div>
      </center>
    </div>
  );
};

export default Page;
