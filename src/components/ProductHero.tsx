'use client';
import { IProduct } from '@/types';
import {
  Button,
  Flex,
  Group,
  NumberInput,
  useMantineTheme,
} from '@mantine/core';
import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import { Carousel } from '@mantine/carousel';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@mantine/hooks';

interface ProductHeroProps {
  product: IProduct;
  className?: string;
}

const ProductHero: FunctionComponent<ProductHeroProps> = ({ product }) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const matches = useMediaQuery('(max-width: 768px)');
  const [quantity, setQuantity] = useState<number | ''>(1);
  return (
    <div className='flex flex-col lg:flex-row gap-4 overflow-hidden relative'>
      <div className='relative lg:w-1/2 w-full h-96 '>
        <Carousel
          w='100%'
          h='100%'
          withIndicators
          styles={{
            indicator: {
              '&[data-active]': {
                backgroundColor: theme.colors.brand[6],
              },
            },
          }}
        >
          {product.images.map((img, idx: number) => (
            <Carousel.Slide h='384px' key={idx}>
              <Image
                className='object-contain'
                src={`${process.env.NEXT_PUBLIC_URL}${img.asset}`}
                alt={product.name}
                fill
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
      <Flex direction='column' gap='md' className='flex-1'>
        <Flex direction='column'>
          <h1>{product.name}</h1>
          <h4 className='m-0'>{product.sku}</h4>
        </Flex>
        <Group p='sm' bg='brand.0'>
          <span className='font-bold text-2xl text-primary'>
            ฿{product.price || 1000}
          </span>
        </Group>
        <Group>
          จำนวน
          <NumberInput
            value={quantity}
            min={1}
            max={product.stock}
            placeholder='ระบุจำนวน'
            onChange={setQuantity}
          />
          มีสินค้าทั้งหมด {product.stock} ชิ้น
        </Group>
        <Group>
          <Button
            fullWidth={matches}
            size='md'
            variant='gradient'
            onClick={() =>
              router.push(`product/checkout/${product.id}?q=${quantity}`)
            }
          >
            ซื้อสินค้า
          </Button>
        </Group>
      </Flex>
    </div>
  );
};

export default ProductHero;
