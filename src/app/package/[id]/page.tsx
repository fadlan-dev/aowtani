import Image from 'next/image';
import { IPackage } from '@/types';
import PackageType from '@/components/PackageType';
import DestinationVisit from '@/components/DestinationVisit';
import LocalGuideItem from '@/components/LocalGuideItem';
import Booking from '@/components/Booking';
import { getPackage } from '@/libs/services/getPackage';

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
    <div className='mt-20 mb-24'>
      <div className='container'>
        <div className='h-96 overflow-hidden relative'>
          <Image
            fill
            className='object-cover'
            src={
              pkg.images[0]?.asset
                ? `${process.env.NEXT_PUBLIC_URL}${pkg.images[0]?.asset}`
                : 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
            }
            alt={pkg.name}
          />
        </div>
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
          </div>
          <div className='w-full lg:w-80'>
            <h3 className='mb-2'>ผู้ประกอบการ</h3>
            {/* <LocalGuidItem /> */}
            <h3 className='mb-2'>ผู้ประกอบการ</h3>
            {/* <LocalGuidItem /> */}
            <h3 className='mb-2'>การจอง</h3>
            <Booking price={pkg.price} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
