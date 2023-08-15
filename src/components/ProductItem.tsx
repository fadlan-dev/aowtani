'use client';
import { numberFormat } from '@/libs/utils';
import { IProduct } from '@/types';
import { AspectRatio, Badge, Card, Group, Text } from '@mantine/core';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductItemProps {
  product: IProduct;
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  return (
    <Link href={`product/${product.id}`}>
      <Card>
        <Card.Section>
          <AspectRatio ratio={16 / 9}>
            <Image
              className='bg-zinc-200 object-contain'
              src={
                product.images[0].asset
                  ? `${process.env.NEXT_PUBLIC_URL}${product.images[0].asset}`
                  : './image.svg'
              }
              alt={product.name}
              fill
            />
          </AspectRatio>
        </Card.Section>
        <Text size='lg' weight={500} mt={8} lineClamp={1}>
          {product.name}
        </Text>
        <Group mt={2}>
          <Badge>ชุมชนบ้านบูดี</Badge>
        </Group>
        <Text weight={600} align='end'>
          ฿{numberFormat(product.price)}
        </Text>
      </Card>
    </Link>
  );
};

export default ProductItem;
