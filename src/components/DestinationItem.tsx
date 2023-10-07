'use client';
import { IDestination } from '@/types';
import { AspectRatio, Card, Text } from '@mantine/core';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface DestinationItemProps {
  destination: IDestination;
}

const DestinationItem: FunctionComponent<DestinationItemProps> = ({
  destination,
}) => {
  return (
    <Link href={`destination/${destination.id}`}>
      <Card padding='md' className='cursor-pointer hover:shadow transition'>
        <Card.Section>
          <AspectRatio ratio={16 / 9}>
            <Image
              className='bg-zinc-200 object-contain'
              src={
                destination.banners[0]?.asset
                  ? `${process.env.NEXT_IMAGE_HOST}${destination.banners[0]?.asset}`
                  : './image.svg'
              }
              alt={destination.name}
              fill
            />
          </AspectRatio>
        </Card.Section>
        <Text size='lg' weight={500} mt={8} lineClamp={1}>
          {destination.name}
        </Text>
        <Text size='xs' className='text-primary' lineClamp={1}>
          {destination.address}
        </Text>
        <Text lineClamp={2}>{destination.description}</Text>
      </Card>
    </Link>
  );
};

export default DestinationItem;
