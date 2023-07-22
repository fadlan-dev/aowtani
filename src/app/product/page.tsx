import ProductList from '@/components/ProductList';
import ProductSearch from '@/components/ProductSearch';
import { IProduct } from '@/types';
import { ActionIcon, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React from 'react';

type Props = {};
export const metadata = {
  title: 'ของฝาก',
};

const getProducts = async (): Promise<IProduct[]> => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products.json`);
  const products = await data.json();

  return products;
};

const page = async (props: Props) => {
  const products = await getProducts();
  return (
    <div className='mt-24 mb-24'>
      <ProductSearch showSearch />
      <ProductList data={products} />
    </div>
  );
};

export default page;
