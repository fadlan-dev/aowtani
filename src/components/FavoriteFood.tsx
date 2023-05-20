import { Carousel } from '@mantine/carousel';
import { Divider, Text, useMantineTheme } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

type Props = {};

const TravelTrending = (props: Props) => {
  const theme = useMantineTheme();
  const data = [
    {
      image:
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      title: 'พื้นบ้าน',
      count: 5,
    },
    {
      image:
        'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=820&q=80',
      title: 'อาหรับ',
      count: 5,
    },
    {
      image:
        'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80',
      title: 'ทะเล',
      count: 5,
    },
    {
      image:
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      title: 'พื้นบ้าน',
      count: 5,
    },
    {
      image:
        'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=820&q=80',
      title: 'อาหรับ',
      count: 5,
    },
    {
      image:
        'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80',
      title: 'ทะเล',
      count: 5,
    },
  ];
  return (
    <div className='pt-11'>
      <div className='container text-center'>
        <h2>อาหารจานโปรดของคุณ</h2>
        <p>เลือกอาหารที่คุณชื่นชอบ</p>
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
