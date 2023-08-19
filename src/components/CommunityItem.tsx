'use client';
import { AspectRatio, Button, Card, Text } from '@mantine/core';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ICommunity } from '@/types';
import { cn } from '@/libs/utils';

interface CommunityItemProps {
  community: ICommunity;
  className?: string;
}

const CommunityItem: FunctionComponent<CommunityItemProps> = ({
  className,
  community,
}) => {
  const router = useRouter();
  return (
    <Card
      padding='md'
      className={cn(className, 'cursor-pointer hover:shadow transition')}
    >
      <Card.Section>
        <AspectRatio ratio={16 / 9}>
          <Image
            className='bg-zinc-200 object-contain'
            src={
              community.images[0]?.asset
                ? `${process.env.NEXT_PUBLIC_URL}${community.images[0].asset}`
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
      <Text size='xs' className='text-primary'>
        {community.address}
      </Text>
      <Text lineClamp={2}>{community.detail}</Text>
      <Button
        variant='light'
        fullWidth
        mt='md'
        radius='md'
        onClick={() => router.push(`community/${community.id}`)}
      >
        ดูรายละเอียด
      </Button>
    </Card>
  );
};

export default CommunityItem;
