import DestinationList from '@/components/DestinationList';
import { getDestinations } from '@/libs/services/getDestinations';
type Props = {};

export const metadata = {
  title: 'สถานที่ท่องเที่ยว',
};

const page = async (props: Props) => {
  const destinations = await getDestinations();
  return (
    <div className='mt-24'>
      <DestinationList
        data={destinations}
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
