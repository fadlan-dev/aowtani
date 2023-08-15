import PartnerList from '@/components/PartnerList';
import { getPartners } from '@/libs/services/getPartners';

type Props = {
  searchParams: {
    [key: string]: 'Hotel' | 'Restaurant' | 'TourActivity' | 'Shop';
  };
};

export const metadata = {
  title: 'ผู้ประกอบการ',
};

const Page = async ({ searchParams }: Props) => {
  const { type } = searchParams;
  const partners = await getPartners({ type: type });

  return (
    <div className='mt-20 mb-20'>
      <PartnerList
        data={partners}
        showSearch
        showPagination
        title='ผู้ประกอบการ'
        subTitle='เลือกรายการสถานที่ท่องเที่ยวตามไลฟ์สไตล์ของคุณ'
      />
    </div>
  );
};

export default Page;
