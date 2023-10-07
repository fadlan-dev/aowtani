import { FunctionComponent, useCallback } from 'react';
import Image from 'next/image';
import ShowAllPhotos from './ShowAllPhotos';
import { IImage } from '@/types';

interface HeroProps {
  images: IImage[];
  name: string;
}

const Hero: FunctionComponent<HeroProps> = ({ images, name }) => {
  const getImage = useCallback(() => images[0].asset, [images]);
  return (
    <div className='h-96 overflow-hidden relative bg-white'>
      <Image
        fill
        className='object-cover w-full h-full'
        src={`${process.env.NEXT_IMAGE_HOST}${getImage()}`}
        alt={name}
      />
      <div className='absolute bottom-2 right-2'>
        <ShowAllPhotos images={images} />
      </div>
    </div>
  );
};

export default Hero;
