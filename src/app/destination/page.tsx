import DestinationList from '@/components/DestinationList';
import { IDestination } from '@/types';
type Props = {};

export const metadata = {
  title: 'สถานที่ท่องเที่ยว',
};

const getDestinations = async (): Promise<IDestination[]> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/destination_visits.json`
  );
  const destinations = await data.json();

  return destinations;
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
