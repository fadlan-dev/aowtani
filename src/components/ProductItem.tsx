'use client';
import { numberFormat } from '@/libs/utils';
import { IProduct } from '@/types';
import { AspectRatio, Badge, Button, Card, Group, Text } from '@mantine/core';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductItemProps {
  product: IProduct;
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  const router = useRouter();
  return (
    <Card>
      <Card.Section>
        <AspectRatio ratio={16 / 9}>
          <Image
            className='bg-zinc-200 object-contain'
            src='./image.svg'
            // src={
            //   product.images[0].asset
            //     ? `${process.env.NEXT_PUBLIC_URL}${product.images[0].asset}`
            //     : './image.svg'
            // }
            alt={product.name}
            fill
          />
        </AspectRatio>
      </Card.Section>
      <Text size='lg' weight={500} mt={8}>
        {product.name}
      </Text>
      <Group mt={2}>
        <Badge>ชุมชนบ้านบูดี</Badge>
      </Group>
      <Text lineClamp={3} mt='xs'>
        {product.details}
      </Text>
      <Text weight={600} align='end'>
        {numberFormat(product.price)} ฿
      </Text>
      <Button
        variant='light'
        fullWidth
        mt='md'
        radius='md'
        onClick={() => router.push(`product/${product.id}`)}
      >
        ดูรายละเอียด
      </Button>
      <Button variant='filled' fullWidth mt='xs' radius='md'>
        ซื้อ
      </Button>
    </Card>
  );
};

export default ProductItem;