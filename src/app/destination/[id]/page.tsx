import NearbyAttractions from '@/components/NearbyAttractions';
import RecommendedPackagesSlide from '@/components/RecommendedPackagesSlide';
import PopularProductsSlide from '@/components/PopularProductsSlide';
import Link from 'next/link';
import { IDestination, IDestinationType } from '@/types';
import Reviews from '@/components/Reviews';
import { getDestination } from '@/libs/services/getDestination';
import Hero from '@/components/Hero';

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
        `${process.env.NEXT_PUBLIC_URL}${dest.banners[0].asset}`,
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
            <p className='mt-4'>{dest.description}</p>
            <div
              id='ck-editor'
              className='mt-4 relative'
              dangerouslySetInnerHTML={{ __html: dest.content }}
            />
            <Reviews
              className='mt-6'
              exploreTo={`review/${params.id}?t=destination`}
            />
            <NearbyAttractions className='mt-6' />
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
            <RecommendedPackagesSlide />
            <PopularProductsSlide />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
