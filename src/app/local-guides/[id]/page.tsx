import CommunityItem from '@/components/CommunityItem';
import LocalGuideItem from '@/components/LocalGuideItem';
import PackageList from '@/components/PackageList';
import { getPackages } from '@/libs/services/getPackages';
import { ILocalGuide } from '@/types';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const localGuide = await getLocalGuide(params.id);
  return {
    title: localGuide.name,
    description: localGuide.detail,
    openGraph: {
      images: [
        `${process.env.NEXT_IMAGE_HOST}${localGuide.profile?.asset}`,
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
  };
}

const getLocalGuide = async (id: string): Promise<ILocalGuide> => {
  const data = await fetch(
    `${process.env.NEXT_API_HOST}/local_guides/${id}.json`
  );
  const res = await data.json();
  return res;
};

const Page = async ({ params }: Props) => {
  const localGuide = await getLocalGuide(params.id);
  const pkgs = await getPackages({
    search: '',
  });
  return (
    <div className='container mt-20 mb-20'>
      <div className='px-4'>
        <h1>โปรไฟล์ไกด์ท้องทิ่น</h1>
        <LocalGuideItem data={localGuide} />
      </div>
      <div className='flex flex-col lg:flex-row gap-4 mt-4'>
        <div className='flex-1'>
          {localGuide.detail && (
            <div style={{ backgroundColor: '#fff' }} className='flex-1 px-4' >
              <h3>รายละเอียด</h3>
              <div
                id='ck-editor'
                className='mt-4 mb-20 relative'
                dangerouslySetInnerHTML={{ __html: localGuide.detail }}
              />
            </div>
          )}
          {localGuide.content && (
            <div style={{ backgroundColor: '#fff' }} className='flex-1 px-4' >
              <h3>เนื้อหา</h3>
              <div
                id='ck-editor'
                className='mt-4 mb-20 relative'
                dangerouslySetInnerHTML={{ __html: localGuide.content }}
              />
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#fff' }} className='w-full lg:w-80'>
          {localGuide.certificate_pdf && (
            <div>
              <h4>ใบรับรอง</h4>
              {localGuide.certificate_pdf?.asset.split('.').pop()?.toLowerCase() === "pdf" ? (
                <embed src={process.env.NEXT_IMAGE_HOST + localGuide.certificate_pdf?.asset} type="application/pdf" width="100%" />
              ) : (
                <img
                  src={process.env.NEXT_IMAGE_HOST + localGuide.certificate_pdf?.asset}
                  width="100%"
                />
              )}
              <div>
                <a href={process.env.NEXT_IMAGE_HOST + localGuide.certificate_pdf?.asset} target="_blank">คลิกลิงค์</a>
              </div>
            </div>
          )}
        </div>

      </div>
      <div className='flex flex-col-reverse lg:flex-row gap-4 mt-4 p-4'>
        <div className='flex-1'>
          <h2>แพ็กเกจทัวร์</h2>
          <PackageList className='mt-2' data={pkgs.data} />
        </div>
        {localGuide.community && (
          <div className='w-full lg:w-80'>
            <h2>สังกัดชุมชน</h2>
            <CommunityItem
              className='mt-2 max-w-[320px]'
              community={localGuide.community}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Page;
