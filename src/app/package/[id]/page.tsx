import { IPackage } from '@/types';
import PackageType from '@/components/PackageType';
import DestinationVisit from '@/components/DestinationVisit';
import Booking from '@/components/Booking';
import { getPackage } from '@/libs/services/getPackage';
import Hero from '@/components/Hero';
import LocalGuideItem from '@/components/LocalGuideItem';
import Reviews from '@/components/Reviews';
import { cn, numberFormat } from '@/libs/utils';

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
              <h1 className='capitalize flex-1'>{pkg.name}</h1>
              <div className='flex flex-row items-baseline gap-1'>
                {pkg.price_before_discount && (
                  <span className={cn('text-slate-400 line-through text-md')}>
                    ฿{numberFormat(pkg.price_before_discount)}
                  </span>
                )}
                <p className='text-primary text-xl font-bold'>
                  ฿{numberFormat(pkg.price)}/ท่าน
                </p>
              </div>
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
              variant='package'
              className='mt-6'
              exploreTo={`review/${params.id}`}
            />
          </div>
          <div className='w-full lg:w-80'>
            <h3 className='mb-2'>ผู้ประกอบการ</h3>
            {/* <LocalGuidItem /> */}
            <h3 className='mb-2'>ไกด์ท้องถิ่น</h3>
            <LocalGuideItem
              data={{
                id: 8,
                name: 'test_guide',
                phone: '321',
                facebook: '23',
                detail: '213',
                address: '12',
                status: 'approved',
                created_at: '2023-08-16T08:01:07.149Z',
                updated_at: '2023-08-16T08:01:16.438Z',
                community: {
                  id: 5,
                  name: 'Test Community',
                  address: 'j',
                  detail: 'j',
                  organization_id: 6,
                  created_at: '2023-08-16T07:59:32.957Z',
                  updated_at: '2023-08-16T07:59:32.971Z',
                  images: [
                    {
                      id: 218,
                      asset:
                        '/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZG89IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--34209269b5e3381ea6b582b28769c9383b945949/3.png',
                    },
                  ],
                },
                experience: '123',
                profile: null,
                id_card_pdf: null,
                house_registration_pdf: null,
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
