import EventShare from '@/components/EventShare';
import Hero from '@/components/Hero';
import UserEvent from '@/components/UserEvent';
import { getEvent } from '@/libs/services/getEvent';
import { IEvent } from '@/types';
import dayjs from 'dayjs';
import('dayjs/locale/th');

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const event: IEvent = await getEvent(params.id);
  return {
    title: event.name,
    description: event.address,
    openGraph: {
      images: [
        // `${process.env.NEXT_PUBLIC_URL}${event.banners[0]}`,
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
  };
}

const Page = async ({ params }: Props) => {
  const event: IEvent = await getEvent(params.id);

  const dateFormatted = (date: string) => {
    dayjs.locale('th');
    return dayjs(date).format('YYYY MMMM DD');
  };

  return (
    <div className='mt-[60px] lg:mt-20 mb-24'>
      <div className='lg:container lg:w-full px-0 lg:px-4'>
        <Hero images={[]} name={event.name} />
      </div>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-4 mt-4'>
          <div className=' flex-1'>
            <h1>{event.name}</h1>
            <p className='text-primary'>{dateFormatted(event.event_date)}</p>
            <p>{event.address}</p>
          </div>
          <div className='w-full lg:w-80'>
            {event.embed_map && (
              <div
                id='embed-map'
                className='aspect-square'
                dangerouslySetInnerHTML={{
                  __html: event.embed_map,
                }}
              />
            )}
            <div>
              <h3 className='mb-1'>ผู้ลงกิจกรรม</h3>
              <UserEvent user={event.user} />
            </div>
            <div>
              <h3 className='mb-1'>แชร์</h3>
              <EventShare />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
