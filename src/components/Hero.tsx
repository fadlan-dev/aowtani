'use client';
import { FunctionComponent, useCallback } from 'react';
import Image from 'next/image';
import { IImage } from '@/types';
import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { MODALS_CONFIG } from '@/libs/utils';
import ImagesCarousel from './ImagesCarousel';

interface HeroProps {
  images: IImage[];
  name: string;
}

const Hero: FunctionComponent<HeroProps> = ({ images, name }) => {
  const getImage = useCallback(() => images[0]?.asset, [images]);
  return (
    <div className='h-96 overflow-hidden relative bg-white'>
      <Image
        fill
        className='object-cover w-full h-full'
        src={ images ? `${process.env.NEXT_IMAGE_HOST}${getImage()}` : './image.svg'}
        alt={images ? name : "ไม่มีรูปภาพ"}
      />
      <div className='absolute bottom-2 right-2'>
        <Button
          size='xs'
          variant='default'
          onClick={() => {
            modals.open({
              ...MODALS_CONFIG,
              children: (
                <>
                  <ImagesCarousel images={images} />
                </>
              ),
            });
          }}
        >
          Show all photos ({images?.length})
        </Button>
      </div>
    </div>
  );
};

export default Hero;
