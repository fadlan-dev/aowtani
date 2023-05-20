'use client';
import { Carousel } from '@mantine/carousel';
import { Divider, Text, useMantineTheme } from '@mantine/core';
import Image from 'next/image';

type Props = {};

const TravelTrending = (props: Props) => {
  const theme = useMantineTheme();
  const data = [
    {
      image:
        'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
      title: 'ล่องเรือ',
      count: 5,
    },
    {
      image:
        'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
      title: 'วัฒนธรรม',
      count: 5,
    },
    {
      image:
        'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
      title: 'ทะเล',
      count: 5,
    },
    {
      image:
        'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
      title: 'Aurora in Norway: when to visit for best experience',
      count: 5,
    },
    {
      image:
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
      title: 'Best places to visit this winter',
      count: 5,
    },
    {
      image:
        'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
      title: 'Active volcanos reviews: travel at your own risk',
      count: 5,
    },
  ];
  return (
    <div className='pt-11 pb-4'>
      <div className='container text-center'>
        <h2>สถานที่ท่องเที่ยวที่คุณต้องการ</h2>
        <p>เลือกสถาที่ที่ใช่กับสไตล์ที่ชอบ</p>
        <div className='mt-6'>
          <Carousel
            slideSize='33.3333333%'
            breakpoints={[
              { maxWidth: 'sm', slideSize: '100%', slideGap: 'xs' },
              { maxWidth: 'md', slideSize: '50%', slideGap: 'xs' },
            ]}
            slideGap='xs'
            align='start'
            slidesToScroll={1}
            withIndicators
            loop
            styles={{
              indicator: {
                position: 'relative',
                bottom: -20,
                backgroundColor: theme.colors.brand[1],
                transition: '0.3s color ease',

                '&[data-active]': {
                  backgroundColor: theme.colors.brand[6],
                },
              },
            }}
          >
            {data.map((item) => (
              <Carousel.Slide key={item.title}>
                <div className='flex flex-col'>
                  <Image
                    className='flex-1 w-full aspect-square object-cover rounded overflow-hidden'
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={500}
                  />
                  <div className='flex-auto pb-4 mt-2 text-start'>
                    <Text className='font-semibold line-clamp-1'>
                      {item.title}
                    </Text>
                    <Divider size='sm' className='w-11 border-primary my-1' />
                    <Text>{item.count} รายการ</Text>
                  </div>
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TravelTrending;
