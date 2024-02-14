'use client';
import { AspectRatio, Card, Text } from '@mantine/core';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import { ICommunity } from '@/types';
import { cn } from '@/libs/utils';
import Link from 'next/link';

interface CommunityItemProps {
  community: ICommunity;
  className?: string;
}

const CommunityItem: FunctionComponent<CommunityItemProps> = ({
  className,
  community,
}) => {
  return (
    <Link href={`community/${community.id}`}>
      <Card
        padding='md'
        className={cn(className, 'cursor-pointer hover:shadow transition')}
      >
        <Card.Section>
          <AspectRatio ratio={16 / 9}>
            <Image
              className='bg-zinc-200 object-cover'
              src={
                community.images[0]?.asset
                  ? `${process.env.NEXT_IMAGE_HOST}${community.images[0].asset}`
                  : './image.svg'
              }
              sizes='(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            25vw'
              alt={community.name}
              fill
            />
          </AspectRatio>
        </Card.Section>
        <Text size='lg' weight={500} mt={8}>
          {community.name}
        </Text>
        <Text size='xs' className='text-primary' lineClamp={1}>
          {community.address}
        </Text>
        <Text lineClamp={2}>{community.detail}</Text>
      </Card>
    </Link>
  );
};

export default CommunityItem;
