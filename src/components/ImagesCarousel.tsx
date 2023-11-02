import { IImage } from '@/types';
import { FunctionComponent, useState } from 'react';
import Swipe from 'react-easy-swipe';
import Image from 'next/image';
import { ActionIcon } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { cn } from '@/libs/utils';

interface ImagesCarouselProps {
  images: IImage[];
}

const btnClass =
  'bg-black/50 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white';

const ImagesCarousel: FunctionComponent<ImagesCarouselProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };
  return (
    <div>
      <div className='w-screen h-[100dvh] flex overflow-hidden relative m-auto'>
        <Swipe
          allowMouseEvents
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
                      ? `${process.env.NEXT_IMAGE_HOST}${image.asset}`
                      : './image.svg'
                  }
                  fill
                  className='animate-fadeIn object-contain select-none'
                  alt={`${image.id}`}
                />
              );
            }
          })}
        </Swipe>
      </div>
      <ActionIcon
        radius='lg'
        className={cn('absolute left-2 m-auto inset-y-1/2 z-30 ', btnClass)}
      >
        <IconChevronLeft onClick={handlePrevSlide} />
      </ActionIcon>
      <ActionIcon
        radius='lg'
        className={cn('absolute right-2 m-auto inset-y-1/2 z-30', btnClass)}
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
  );
};

export default ImagesCarousel;
