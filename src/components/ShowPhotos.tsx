'use client';
import { IImage } from '@/types';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Carousel } from '@mantine/carousel';
import { useRouter } from 'next/navigation';
import { CloseButton, Modal, useMantineTheme } from '@mantine/core';

interface ShowPhotosProps {
  images: IImage[];
}

const ShowPhotos: FunctionComponent<ShowPhotosProps> = ({ images }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const open = searchParams.get('photos') === 'show' ? true : false;
  const theme = useMantineTheme();
  return (
    <Modal.Root
      opened={open}
      bg='rgba(9, 9, 11, 0.55)'
      onClose={() => router.back()}
      fullScreen
    >
      <Modal.Overlay />
      <Modal.Content px={0} bg='rgba(9, 9, 11, 0.55)'>
        <div className='absolute right-4 top-4 z-20'>
          <CloseButton
            variant='default'
            radius='lg'
            aria-label='Close modal'
            onClick={() => router.back()}
          />
        </div>
        <Carousel
          withIndicators
          styles={{
            indicator: {
              transition: 'width 250ms ease',
              backgroundColor: theme.colors.gray[4],
              '&[data-active]': {
                backgroundColor: theme.colors.brand[5],
              },
            },
          }}
        >
          {images.map((img: IImage) => (
            <Carousel.Slide
              key={img.id}
              w='100vw'
              h='100vh'
              className='relative'
            >
              <Image
                className='object-contain'
                src={
                  img.asset
                    ? `${process.env.NEXT_PUBLIC_URL}${img.asset}`
                    : './image.svg'
                }
                alt={`${img.id}`}
                fill
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ShowPhotos;
