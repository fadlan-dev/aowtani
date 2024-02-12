import Hero from '@/components/Hero';
import NearbyAttractions from '@/components/NearbyAttractions';
import Reviews from '@/components/Reviews';
import Share from '@/components/Share';
import { getPartner } from '@/libs/services/getPartner';
import { IPartner } from '@/types';

type Props = {
  params: { id: string };
};

const page = async ({ params }: Props) => {
  const partner: IPartner = await getPartner(params.id);
  return (
    <div className='mt-[60px] lg:mt-20 mb-24'>
      <div className='lg:container lg:w-full px-0 lg:px-4'>
        <Hero images={partner.images || []} name={partner.name} />
      </div>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-4 mt-4'>
          <div className='flex-1'>
            <h1 className='capitalize'>{partner.name}</h1>
            <p className='text-primary'>{partner.address}</p>
            <Share/>
            <p className='mt-4'>{partner.detail}</p>
            <Reviews variant='business_partners' className='mt-6' />
            <NearbyAttractions
              className='mt-6'
              organization={partner.organization}
            />
          </div>
          <div className='w-full lg:w-80'>
            {partner.embed_map && (
              <div
                id='embed-map'
                className='aspect-square'
                dangerouslySetInnerHTML={{
                  __html: partner.embed_map,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
