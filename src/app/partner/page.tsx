import PartnerList from '@/components/PartnerList';
import { IPartner } from '@/types';

type Props = {
  searchParams: {
    [key: string]: 'Hotel' | 'Restaurant' | 'TourActivity' | 'Shop';
  };
};

export const metadata = {
  title: 'ผู้ประกอบการ',
};

const getPartners = async ({
  type,
}: {
  type: 'Hotel' | 'Restaurant' | 'TourActivity' | 'Shop';
}): Promise<IPartner[]> => {
  const data = await fetch(
    type
      ? `${process.env.NEXT_PUBLIC_API_URL}/business_partners.json?type=${type}`
      : `${process.env.NEXT_PUBLIC_API_URL}/business_partners.json`
  );
  const partners = await data.json();

  return partners;
};

const Page = async ({ searchParams }: Props) => {
  const { type } = searchParams;
  const partners = await getPartners({ type: type });

  return (
    <div className='mt-20 mb-20'>
      <PartnerList
        data={partners}
        showSearch
        title='ผู้ประกอบการ'
        subTitle='เลือกรายการสถานที่ท่องเที่ยวตามไลฟ์สไตล์ของคุณ'
      />
    </div>
  );
};

export default Page;
