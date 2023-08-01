'use client';
import { Button } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';

interface ShowAllPhotosProps {
  total: number;
}

const ShowAllPhotos: FunctionComponent<ShowAllPhotosProps> = ({ total }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Button
      size='xs'
      variant='default'
      onClick={() => {
        router.push(`${pathname}?photos=show`);
      }}
    >
      Show all photos ({total})
    </Button>
  );
};

export default ShowAllPhotos;
