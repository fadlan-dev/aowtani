'use client';
import { numberFormat } from '@/libs/utils';
import { IProduct } from '@/types';
import { AspectRatio, Badge, Card, Flex, Group, Text } from '@mantine/core';
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
        <Flex justify='end'>
          <Flex align='baseline' gap={2}>
            <Text weight='bold' size='lg' c='brand.6'>
              ฿{numberFormat(product.price)}
            </Text>
            {product.price_before_discount > 0 && (
              <Text size='sm' c='dimmed' td='line-through'>
                ฿{numberFormat(product.price_before_discount)}
              </Text>
            )}
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};

export default ProductItem;
