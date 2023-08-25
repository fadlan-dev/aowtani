import { IPackage } from '@/types';
import PackageType from '@/components/PackageType';
import DestinationVisit from '@/components/DestinationVisit';
import Booking from '@/components/Booking';
import { getPackage } from '@/libs/services/getPackage';
import Hero from '@/components/Hero';
import LocalGuideItem from '@/components/LocalGuideItem';
import Reviews from '@/components/Reviews';

interface pageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: pageProps) {
  const pkg = await getPackage(params.id);
  return {
    title: pkg.name,
    description: pkg.desciption,
    openGraph: {
      images: [
        `${process.env.NEXT_PUBLIC_URL}${pkg.images[0]?.asset}`,
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
  };
}

async function page({ params }: pageProps) {
  const { id } = params;
  const pkg: IPackage = await getPackage(id);
  return (
    <div className='mt-[60px] lg:mt-20 mb-24'>
      <div className='lg:container lg:w-full px-0 lg:px-4'>
        <Hero images={pkg.images} name={pkg.name} />
      </div>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-4 mt-4'>
          <div className='flex-1'>
            <div className='flex flex-col sm:flex-row items-baseline justify-between'>
              <h1 className='capitalize'>{pkg.name}</h1>
              <h4 className='font-semibold'>
                ราคา
                <span className='text-primary text-xl px-1'>
                  {pkg.price.toLocaleString()}
                </span>
                บาท/ท่าน
              </h4>
            </div>
            <PackageType types={pkg.types} />
            <DestinationVisit
              className='mt-2'
              destination={pkg.destination_visit}
            />
            <div
              id='ck-editor'
              className='mt-4 relative'
              dangerouslySetInnerHTML={{ __html: pkg.content }}
            />
            <div
              id='ck-editor'
              className='mt-4 relative'
              dangerouslySetInnerHTML={{ __html: pkg.conditions }}
            />
            <Reviews
              variant='destination'
              className='mt-6'
              exploreTo={`review/${params.id}?t=destination`}
            />
          </div>
          <div className='w-full lg:w-80'>
            <h3 className='mb-2'>ผู้ประกอบการ</h3>
            {/* <LocalGuidItem /> */}
            <h3 className='mb-2'>ไกด์ท้องถิ่น</h3>
            <LocalGuideItem
              data={{
                id: 1,
                name: 'XXXX',
                phone: '0912212211',
                facebook: 'face',
                detail: 'XXXXX',
                address: 'xxxx',
                status: 'pending',
                created_at: '2023-07-25T10:47:14.509Z',
                updated_at: '2023-07-25T10:47:14.521Z',
                community: {
                  id: 1,
                  name: 'test com',
                  address: 'address',
                  detail: 'test',
                  organization_id: 1,
                  created_at: '2023-07-25T10:45:50.306Z',
                  updated_at: '2023-07-25T10:45:50.347Z',
                  images: [
                    {
                      id: 2,
                      asset:
                        '/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d6bb47e75c40c5fdc08b4bb9849e278074865f16/Screen%20Shot%202023-07-20%20at%2010.54.50.png',
                    },
                  ],
                  content: '',
                },
                experience: 'exp',
                profile: {
                  id: 3,
                  asset:
                    '/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8a471c56803656c8a27c02a9beaa5855982017bb/Screen%20Shot%202023-07-20%20at%2010.26.28.png',
                },
                id_card_pdf: {
                  id: 4,
                  asset:
                    '/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--02fb7690b86e0bf88d2600fc0b6cc76a9195c99b/logo.jpeg',
                },
                house_registration_pdf: {
                  id: 5,
                  asset:
                    '/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f2f679edbea4451faa4b087fba4543515c4a3368/logo.jpeg',
                },
                certificate_pdf: null,
              }}
            />
            <h3 className='mb-2'>การจอง</h3>
            <Booking price={pkg.price} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
