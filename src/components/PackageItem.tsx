'use client';
import { numberFormat } from '@/libs/utils';
import { IPackage } from '@/types';
import { AspectRatio, Badge, Card, Flex, Group, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
type Props = {
  pkg: IPackage;
};

const PackageItem = ({ pkg }: Props) => {
  return (
    <Link href={`/package/${pkg.id}`}>
      <Card>
        <Card.Section>
          <AspectRatio ratio={16 / 9}>
            <Image
              className='bg-zinc-200 object-contain'
              src={
                `${process.env.NEXT_PUBLIC_URL}${pkg.images[0].asset}` ||
                './image.svg'
              }
              alt={pkg.name}
              fill
            />
          </AspectRatio>
        </Card.Section>
        <Text size='lg' lineClamp={1} weight={500} mt={8}>
          {pkg.name}
        </Text>
        <Group spacing={4}>
          {pkg.types.map((type: string) => (
            <Badge key={type}>{type}</Badge>
          ))}
        </Group>
        <Text lineClamp={2}>{pkg.desciption}</Text>
        <Flex justify='end' align='end' direction='column' gap={0} mt='sm'>
          <Text weight='bold' color='brand'>
            ฿{numberFormat(pkg.price)}/ท่าน
          </Text>
          {pkg.price_before_discount && (
            <Text align='end' td='line-through' c='dimmed'>
              {numberFormat(pkg.price_before_discount)}
            </Text>
          )}
        </Flex>
      </Card>
    </Link>
  );
};

export default PackageItem;
