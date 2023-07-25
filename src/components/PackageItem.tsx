'use client';
import { IPackage } from '@/types';
import { AspectRatio, Badge, Button, Card, Group, Text } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
type Props = {
  pkg: IPackage;
};

const PackageItem = ({ pkg }: Props) => {
  const router = useRouter();
  return (
    <Card>
      <Card.Section>
        <AspectRatio ratio={16 / 9}>
          <Image
            className='bg-zinc-200 object-contain'
            src={pkg.images[0]?.thumbUrl || './image.svg'}
            alt={pkg.name}
            fill
          />
        </AspectRatio>
      </Card.Section>
      <Text size='lg' weight={500} mt={8}>
        {pkg.name}
      </Text>
      <Group spacing={4}>
        {pkg.types.map((type: string) => (
          <Badge key={type}>{type}</Badge>
        ))}
      </Group>
      <Text lineClamp={3}>{pkg.desciption}</Text>
      <Text weight={600} align='end'>
        {pkg.price.toLocaleString()} ฿/ท่าน
      </Text>
      <Button
        variant='light'
        fullWidth
        mt='md'
        radius='md'
        onClick={() => router.push(`/package/${pkg.id}`)}
      >
        ดูรายละเอียด
      </Button>
    </Card>
  );
};

export default PackageItem;
