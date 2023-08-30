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
        `${process.env.NEXT_PUBLIC_URL}${localGuide.profile?.asset}`,
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
  };
}

const getLocalGuide = async (id: string): Promise<ILocalGuide> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/local_guides/${id}.json`
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
    <div className='mt-20 mb-20'>
      <div className='px-4'>
        <h1>โปรไฟล์ไกด์ท้องทิ่น</h1>
        <LocalGuideItem data={localGuide} />
      </div>
      <div className='flex flex-col-reverse lg:flex-row gap-4 mt-4 p-4'>
        <div className='flex-1'>
          <h2>แพ็กเกจทัวร์</h2>
          <PackageList className='mt-2' data={pkgs.data} />
        </div>

        <div className='w-full lg:w-80'>
          <h2>สังกัดชุมชน</h2>
          <CommunityItem
            className='mt-2 max-w-[320px]'
            community={localGuide.community}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
