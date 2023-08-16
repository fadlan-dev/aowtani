import PartnerList from '@/components/PartnerList';
import ShowAllPhotos from '@/components/ShowAllPhotos';
import ShowPhotos from '@/components/ShowPhotos';
import { ICommunity } from '@/types';
import Image from 'next/image';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const commu: ICommunity = await getCommunity(params.id);
  return {
    title: commu.name,
    description: commu.detail,
    openGraph: {
      images: [
        `${process.env.NEXT_PUBLIC_URL}${commu.images[0]}`,
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
  };
}

const getCommunity = async (id: string): Promise<ICommunity> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/communities/${id}.json`,
    { cache: 'no-store' }
  );
  const community = await data.json();
  return community;
};

const page = async ({ params }: Props) => {
  const community: ICommunity = await getCommunity(params.id);
  return (
    <div className='mt-[60px] lg:mt-20 mb-24'>
      <div className='lg:container lg:w-full px-0 lg:px-4'>
        <div className='h-96 overflow-hidden relative'>
          <Image
            className='bg-zinc-200 object-cover'
            src={
              community.images[0]?.asset
                ? `${process.env.NEXT_PUBLIC_URL}${community.images[0].asset}`
                : './image.svg'
            }
            alt={community.name}
            fill
          />
          <div className='absolute bottom-2 right-2'>
            <ShowPhotos images={community.images} />
            <ShowAllPhotos total={community.images.length} />
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-4 mt-4'>
          <div className=' flex-1'>
            <h1>{community.name}</h1>
            <p className='text-primary'>{community.address}</p>
            <p className='mt-2'>{community.detail}</p>
            <div
              id='ck-editor'
              className='mt-4 relative'
              dangerouslySetInnerHTML={{ __html: community.content }}
            />
          </div>
          <div className='w-full lg:w-80'>
            <h3 className='mb-2'>สังกัดหน่วยงาน</h3>
            <div className=' aspect-square bg-zinc-200'></div>
          </div>
        </div>
        <PartnerList title='ผู้ประกอบการ' className='mt-6' showMore data={[]} />
      </div>
    </div>
  );
};

export default page;
