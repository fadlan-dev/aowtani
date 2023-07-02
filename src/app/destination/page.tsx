import DestinationList from '@/components/DestinationList';
type Props = {};

export const metadata = {
  title: 'สถานที่ท่องเที่ยว',
};

const page = (props: Props) => {
  return (
    <div className='mt-24'>
      <DestinationList
        showSearch
        showPagination
        title='สถานที่ท่องเที่ยว'
        subTitle='เลือกรายการสถานที่ท่องเที่ยวตามไลฟ์สไตล์ของคุณ'
        className='mt-6 mb-6'
      />
    </div>
  );
};

export default page;
