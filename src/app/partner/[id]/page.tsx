import PackageList from '@/components/PackageList';
import PartnerCard from '@/components/PartnerItem';
import { getPackages } from '@/libs/services/getPackages';
import { getPartner } from '@/libs/services/getPartner';
import { IPartner } from '@/types';

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

const Page = async ({ params }: Props) => {
  const pkgs = await getPackages({
    search: '',
  });
  const partner: IPartner = await getPartner(params.id);
  return (
    <div className='container mt-20 mb-20'>
      <div className='px-4'>
        <h1>โปรไฟล์ผู้ประกอบการ</h1>
        <PartnerCard partner={partner} className='mt-2' />
      </div>
      <div
        className='flex flex-col lg:flex-row gap-4 mt-4'
      >
        {partner.content && (
          <div style={{ backgroundColor: '#fff' }} className='flex-1 px-4' >
            <h3>รายละเอียด</h3>
            <div
              id='ck-editor'
              className='mt-4 mb-20 relative'
              dangerouslySetInnerHTML={{ __html: partner.content }}
            />
          </div>
        )}

        <div style={{ backgroundColor: '#fff' }} className='card w-full lg:w-80'>
          <h3>แผนที่</h3>
          {partner.embed_map && (
            // /<iframe.*?>.*?<\/iframe>/i.test(partner.embed_map) ? (
              <div
                id='embed-map'
                className='aspect-square'
                dangerouslySetInnerHTML={{
                  __html: partner.embed_map,
                }}
              />
            // ) : (
            //   <iframe src="https://maps.app.goo.gl/A17MssmmrmZNkN7y5"
            //   width="600" height="450" loading="lazy" ></iframe>
            //  )
          )}
          {partner.community && (
            <div className='mt-4 ml-10 relative' >
              <h4>กลุ่มชุมชน</h4>
              <span> - {partner.community.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className='px-4'>
        <div className='flex-1'>
          <h3>แพ็กเกจทัวร์</h3>
          <PackageList data={pkgs.data} />
        </div>
        <div className='hidden w-80'>
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
