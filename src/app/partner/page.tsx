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
  });

  return (
    <div className='mt-24 mb-20'>
      <PartnerList
        data={partners.data}
        total={partners.total}
        showSearch
        showPagination
        title='ผู้ประกอบการ'
        subTitle='เลือกรายการสถานที่ท่องเที่ยวตามไลฟ์สไตล์ของคุณ'
      />
    </div>
  );
};

export default page;
