import BasciSearch from '@/components/BasicSearch';
import PartnerFilter from '@/components/PartnerFilter';
import PartnerList from '@/components/PartnerList';
import { getPartners } from '@/libs/services/getPartners';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: 'ผู้ประกอบการ',
};

// Define the valid types
export type ValidPartnerType =
  | ''
  | 'Hotel'
  | 'Restaurant'
  | 'TourActivity'
  | 'Shop';

const page = async ({ searchParams }: Props) => {
  const type = (searchParams.type as ValidPartnerType) || '';
  const partners = await getPartners({
    page: Number(searchParams.page) || 1,
    type: type,
    search: `${searchParams.search || ''}`,
  });

  return (
    <div className='pt-20 mb-24'>
      <center>
        <h1>ผู้ประกอบการ</h1>
        <p>เลือกรายการสถานที่ท่องเที่ยวตามไลฟ์สไตล์ของคุณ</p>
      </center>
      <BasciSearch placeholder='ค้นหาสถานทที่ต้องการ' />
      <PartnerFilter />
      <PartnerList data={partners.data} total={partners.total} />
    </div>
  );
};

export default page;
