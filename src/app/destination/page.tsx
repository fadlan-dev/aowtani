import DestinationList from '@/components/DestinationList';
import { getDestinations } from '@/libs/services/getDestinations';
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: 'สถานที่ท่องเที่ยว',
};

const page = async ({ searchParams }: Props) => {
  const destinations = await getDestinations({
    destination_type_id: searchParams.destination_type_id as string,
    organization_id: searchParams.organization_id as string,
    page: 1,
  });
  return (
    <div className='mt-24'>
      {searchParams.destination_type_id}
      <DestinationList
        data={destinations.data}
        total={destinations.total}
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
