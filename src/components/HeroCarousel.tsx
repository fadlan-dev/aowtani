'use client';
import React from 'react';
import { Carousel } from '@mantine/carousel';
import { rem } from '@mantine/core';
import Image from 'next/image';

type Props = {
  className?: string;
};

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&w=2878&q=80',
    title: 'Phra Nang Beach, Krabi, Thailand',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1598255055837-723370293a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&w=2825&q=80',
    title: 'Krabi, Thailand',
    category: 'beach',
  },
];

const Hero = ({ className }: Props) => {
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title} className='h-[420px]'>
      <Image
        src={item.image}
        alt={item.title}
        className='w-full object-cover'
        width={500}
        height={500}
      />
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
      >
        {slides}
      </Carousel>
    </div>
  );
};

export default Hero;
