import NearbyAttractions from '@/components/NearbyAttractions';
import RecommendedPackagesSlide from '@/components/RecommendedPackagesSlide';
import PopularProductsSlide from '@/components/PopularProductsSlide';
import Link from 'next/link';
import { IDestination, IDestinationType } from '@/types';
import Reviews from '@/components/Reviews';
import { getDestination } from '@/libs/services/getDestination';
import Hero from '@/components/Hero';
import OrganizationItem from '@/components/OrganizationItem';
import Share from '@/components/Share';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const dest = await getDestination(params.id);
  return {
    title: dest.name,
    description: dest.description,
    openGraph: {
      images: [
        dest.banners ? 
          dest.banners[0].asset ? `${process.env.NEXT_IMAGE_HOST}${dest.banners[0].asset}` : './image.svg'
        : './image.svg',
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
  };
}

function DestinationType({
  destinationType,
}: {
  destinationType: IDestinationType;
}) {
  return (
    <ul>
      <li key={destinationType.id}>
        <Link
          className='text-primary hover:underline'
          href={`/destination?t=${destinationType.name}`}
        >
          #{destinationType.name}
        </Link>
      </li>
    </ul>
  );
}

const page = async ({ params }: Props) => {
  const dest: IDestination = await getDestination(params.id);
  return (
    <div className='mt-[60px] lg:mt-20 mb-24'>
      <div className='lg:container lg:w-full px-0 lg:px-4'>
        <Hero images={dest.banners} name={dest.name} />
      </div>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-4 mt-4'>
          <div className='flex-1'>
            <h1 className='capitalize'>{dest.name}</h1>
            <p className='text-primary'>{dest.address}</p>
            <div className='flex gap-2'>
              <DestinationType destinationType={dest.destination_type} />
            </div>
            <Share/>
            <p className='mt-4'>{dest.description}</p>
            <div
              id='ck-editor'
              className='mt-4 relative'
              dangerouslySetInnerHTML={{ __html: dest.content }}
            />
            <Reviews variant='destination_visits' className='mt-6' />
            <NearbyAttractions
              className='mt-6'
              organization={dest.organization}
            />
          </div>
          <div className='w-full lg:w-80'>
            {dest.embed_map && (
              <div
                id='embed-map'
                className='aspect-square'
                dangerouslySetInnerHTML={{
                  __html: dest.embed_map,
                }}
              />
            )}
            <div className='w-full lg:w-80'>
              <h3 className='mb-2'>สังกัดหน่วยงาน</h3>
              <OrganizationItem data={dest.organization} />
            </div>
            <RecommendedPackagesSlide organization={dest.organization} />
            <PopularProductsSlide organization={dest.organization} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
