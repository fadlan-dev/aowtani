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
      bg='rgba(233, 236, 239, 0.55)'
      onClose={() => router.back()}
      fullScreen
    >
      <Modal.Overlay />
      <Modal.Content px={0} bg='black'>
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
            <Carousel.Slide w='100vw' h='100vh' className='relative'>
              <Image
                className='object-contain'
                src={
                  'https://images.unsplash.com/photo-1690342824253-4d9488961ded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
                }
                // src={`${process.env.NEXT_PUBLIC_URL}${img.asset}`}
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
