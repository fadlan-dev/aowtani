import { IDestination } from '@/types';
import { AspectRatio, Button, Card, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';
import Image from 'next/image';

interface DestinationCardProps {
  destination: IDestination;
}

const DestinationCard: FunctionComponent<DestinationCardProps> = ({
  destination,
}) => {
  const router = useRouter();
  return (
    <Card padding='md' className='cursor-pointer hover:shadow transition'>
      <Card.Section>
        <AspectRatio ratio={16 / 9}>
          <Image
            className='bg-zinc-200 object-contain'
            src={
              destination.banners[0]?.asset
                ? `${process.env.NEXT_PUBLIC_URL}${destination.banners[0]?.asset}`
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
      <Button
        variant='light'
        fullWidth
        mt='md'
        radius='md'
        onClick={() => router.push(`destination/${destination.id}`)}
      >
        ดูรายละเอียด
      </Button>
    </Card>
  );
};

export default DestinationCard;
