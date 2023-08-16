'use client';
import { IImage } from '@/types';
import { FunctionComponent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ActionIcon, CloseButton } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Swipe from 'react-easy-swipe';
import { cn } from '@/libs/utils';

interface ShowPhotosProps {
  images: IImage[];
}

const ShowPhotos: FunctionComponent<ShowPhotosProps> = ({ images }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const open = searchParams.get('photos') === 'show' ? true : false;

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (open) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    } else {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }
  }, [open]);

  const handleNextSlide = () => {
    console.log('left');
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    console.log('rignt');
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };
  if (!open) return null;

  return (
    <div className='w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-30 bg-[#09090bd9]'>
      <div className='relative'>
        <div className='absolute right-4 top-4 z-20'>
          <CloseButton
            variant='default'
            radius='lg'
            aria-label='Close modal'
            onClick={() => router.back()}
          />
        </div>
        <ActionIcon
          variant='transparent'
          radius='lg'
          className='absolute left-2 m-auto inset-y-1/2 z-30'
        >
          <IconChevronLeft onClick={handlePrevSlide} />
        </ActionIcon>
        <div className='w-screen h-screen flex overflow-hidden relative m-auto'>
          <Swipe
            onSwipeLeft={handleNextSlide}
            onSwipeRight={handlePrevSlide}
            className='relative z-10 w-full h-full'
          >
            {images.map((image, index) => {
              if (index === currentSlide) {
                return (
                  <Image
                    key={image.id}
                    src={
                      image.asset
                        ? `${process.env.NEXT_PUBLIC_URL}${image.asset}`
                        : './image.svg'
                    }
                    fill
                    className='animate-fadeIn object-contain'
                    alt={`${image.id}`}
                  />
                );
              }
            })}
          </Swipe>
        </div>
        <ActionIcon
          variant='transparent'
          radius='lg'
          className='absolute right-2 m-auto inset-y-1/2 z-30'
        >
          <IconChevronRight onClick={handleNextSlide} />
        </ActionIcon>

        <div className='w-full absolute bottom-2 flex justify-center p-2 z-30'>
          {images.map((_, index) => {
            return (
              <div
                className={cn(
                  'transition-all h-2 w-2 bg-slate-300 rounded-full mx-1 mb-2 cursor-pointer',
                  index === currentSlide && 'bg-primary w-4'
                )}
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShowPhotos;
