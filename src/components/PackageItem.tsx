'use client';
import { numberFormat } from '@/libs/utils';
import { IPackage } from '@/types';
import { AspectRatio, Badge, Card, Flex, Group, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
type Props = {
  data: IPackage;
};

const PackageItem = ({ data }: Props) => {
  return (
    <Link href={`/package/${data.id}`}>
      <Card>
        <Card.Section>
          <AspectRatio ratio={16 / 9}>
            <Image
              className='bg-zinc-200 object-contain'
              src={
                `${process.env.NEXT_PUBLIC_URL}${data.images[0].asset}` ||
                './image.svg'
              }
              alt={data.name}
              fill
            />
          </AspectRatio>
        </Card.Section>
        <Text size='lg' lineClamp={1} weight={500} mt={8}>
          {data.name}
        </Text>
        <Group spacing={4}>
          {data.types.map((type: string) => (
            <Badge key={type}>{type}</Badge>
          ))}
        </Group>
        <Text lineClamp={2}>{data.desciption}</Text>
        <Flex justify='end' align='end' direction='column' gap={0} mt='sm'>
          <Text weight='bold' color='brand'>
            ฿{numberFormat(data.price)}/ท่าน
          </Text>
          {data.price_before_discount && (
            <Text align='end' td='line-through' c='dimmed'>
              {numberFormat(data.price_before_discount)}
            </Text>
          )}
        </Flex>
      </Card>
    </Link>
  );
};

export default PackageItem;
