import PackageList from '@/components/PackageList';
import PartnerCard from '@/components/PartnerItem';
import { getPackages } from '@/libs/services/getPackages';
import { IPackage, IPartner } from '@/types';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const partner: IPartner = await getPartner(params.id);
  return {
    title: partner.name,
    description: partner.detail,
    openGraph: {
      images: [
        `${process.env.NEXT_PUBLIC_URL}${partner.images}`,
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
  };
}

const getPartner = async (id: string): Promise<IPartner> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/business_partners/${id}.json`
  );
  const partner = await data.json();
  return partner;
};

const Page = async ({ params }: Props) => {
  const pkgs = await getPackages({
    search: '',
  });
  const partner: IPartner = await getPartner(params.id);
  return (
    <div className='mt-20 mb-20'>
      <div className='px-4'>
        <h1>โปรไฟล์ผู้ประกอบการ</h1>
        <PartnerCard partner={partner} className='mt-2' />
      </div>
      <div className='px-4'>
        <div className='flex-1'>
          <h3>แพ็กเกจทัวร์</h3>
          <PackageList data={pkgs.data} />
        </div>
        <div className='hidden lg:block w-80'>
          <h3>สังกัดชุมชน</h3>
          {/* 
       
          <Card mt='md'>
            <Card.Section>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
                  alt='Norway'
                  fill
                />
              </AspectRatio>
            </Card.Section>
            <Text size='lg' weight={500} mt={8}>
              ชุมชนบางปู
            </Text>
            <Text size='xs' className='text-primary'>
              ปน.2062 ตำบล แหลมโพธิ์ อำเภอ ยะหริ่ง ปัตตานี 94150
            </Text>
            <Text lineClamp={3}>
              พื้นที่อ่าวปัตตานีเป็นพื้นที่ป่าชายเลนขนาดใหญ่และอุดมสมบูรณ์แห่งหนึ่งของประเทศไทย
              ที่เปิดให้มีการท่องเที่ยวเชิงอนุรักษ์ธรรมชาติ
            </Text>
          </Card>
        */}
        </div>
      </div>
    </div>
  );
};

export default Page;
