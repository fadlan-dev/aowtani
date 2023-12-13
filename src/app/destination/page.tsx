import BasciSearch from '@/components/BasicSearch';
import DestinationFilter from '@/components/DestinationFIlter';
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
    destination_type_id:
      (searchParams.destination_type_id as string) || undefined,
    organization_id: (searchParams.organization_id as string) || undefined,
    page: Number(searchParams.page) || 1,
    search: `${searchParams.search || ''}`,
  });

  return (
    <div className='pt-24 mb-24'>
      <center>
        <h1>สถานที่ท่องเที่ยว</h1>
        <p>เลือกรายการสถานที่ท่องเที่ยวตามไลฟ์สไตล์ของคุณ</p>
      </center>
      <BasciSearch placeholder='ค้นหาสถานที่ท่องเที่ยวที่ต้องการ' />
      <DestinationFilter />
      <DestinationList
        data={destinations.data}
        total={destinations.total}
        showPagination
        className='mt-6 mb-6'
      />
    </div>
  );
};

export default page;
