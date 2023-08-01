'use client';
import { IProduct } from '@/types';
import { Button, Flex, Group, NumberInput } from '@mantine/core';
import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import { Carousel } from '@mantine/carousel';
import { useRouter } from 'next/navigation';

interface ProductHeroProps {
  product: IProduct;
  className?: string;
}

const ProductHero: FunctionComponent<ProductHeroProps> = ({ product }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number | ''>(1);
  return (
    <div className='flex flex-col lg:flex-row gap-4 overflow-hidden relative'>
      <div className='relative lg:w-1/2 w-full h-96 '>
        <Carousel w='100%' h='100%' withIndicators>
          {new Array(5).fill('').map((_, idx: number) => (
            <Carousel.Slide h='384px' key={idx}>
              <Image
                className='object-cover'
                src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1699&q=80'
                alt={product.name}
                fill
              />
            </Carousel.Slide>
          ))}
        </Carousel>
        {/* <Image
          className='object-cover'
          src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1699&q=80'
          // src={
          //   product.images[0]?.asset
          //     ? `${process.env.NEXT_PUBLIC_URL}${product.images[0].asset}`
          //     : 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
          // }
          alt={product.name}
          fill
        /> */}
      </div>
      <Flex direction='column' gap='md' className='flex-1'>
        <Flex direction='column'>
          <h1>{product.name}</h1>
          <h4 className='m-0'>{product.sku}</h4>
        </Flex>
        <Group p='sm' bg='brand.0'>
          <p>ราคา</p>
          <span className='font-bold text-2xl text-primary'>
            {product.price || 1000}฿
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
            size='md'
            variant='gradient'
            onClick={() => router.push(`product/payment/${product.id}`)}
          >
            ซื้อสินค้า
          </Button>
        </Group>
      </Flex>
    </div>
  );
};

export default ProductHero;
