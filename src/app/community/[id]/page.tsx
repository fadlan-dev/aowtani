import Hero from '@/components/Hero';
import OrganizationItem from '@/components/OrganizationItem';
import PartnerList from '@/components/PartnerList';
import Share from '@/components/Share';
import { getCommunity } from '@/libs/services/getComunity';
import { ICommunity } from '@/types';

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
        commu.images ? `${process.env.NEXT_PUBLIC_URL}${commu.images[0]}` : './image.svg',
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
  };
}

const page = async ({ params }: Props) => {
  const community: ICommunity = await getCommunity(params.id);
  return (
    <div className='mt-[60px] lg:mt-20 mb-24'>
      <div className='lg:container lg:w-full px-0 lg:px-4'>
        <Hero images={community.images} name={community.name} />
      </div>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-4 mt-4'>
          <div className=' flex-1'>
            <h1>{community.name}</h1>
            <p className='text-primary'>{community.address}</p>
            <Share/>
            <p className='mt-2'>{community.detail}</p>
            {community.content && (
              <div
                id='ck-editor'
                className='mt-4 relative'
                dangerouslySetInnerHTML={{ __html: community.content }}
              />
            )}
          </div>
          <div className='w-full lg:w-80'>
            <h3 className='mb-2'>สังกัดหน่วยงาน</h3>
            <OrganizationItem data={community.organization} />
          </div>
        </div>
        <PartnerList className='mt-6' showMore data={[]} total={1} />
      </div>
    </div>
  );
};

export default page;
