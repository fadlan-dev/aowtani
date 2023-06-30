import EntrepreneursList from '@/components/EntrepreneursList';

type Props = {};

export const metadata = {
  title: 'ผู้ประกอบการ',
};

const Page = (props: Props) => {
  return (
    <div className='mt-20 mb-20'>
      <EntrepreneursList
        showSearch
        title='ผู้ประกอบการ'
        subTitle='เลือกรายการสถานที่ท่องเที่ยวตามไลฟ์สไตล์ของคุณ'
      />
    </div>
  );
};

export default Page;
