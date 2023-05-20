import React from 'react';
import { Carousel } from '@mantine/carousel';
import { rem } from '@mantine/core';

type Props = {
  className?: string;
};

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1504203328729-b937e8e102f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80',
    title: 'Best forests to visit in North America',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1583491470869-ca0b9fa90216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80',
    title: 'Hawaii beaches review: better than you think',
    category: 'beach',
  },
];

const Hero = ({ className }: Props) => {
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title} className='h-96'>
      <img src={item.image} className='w-full object-cover' />
    </Carousel.Slide>
  ));
  return (
    <div className={`bg-zinc-100 ${className}`}>
      <Carousel
        slideSize='100%'
        breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(2) }]}
        slideGap='xs'
        align='start'
        slidesToScroll={1}
        withIndicators
        loop
        dragFree
      >
        {slides}
      </Carousel>
    </div>
  );
};

export default Hero;
