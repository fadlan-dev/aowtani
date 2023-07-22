'use client';
import { IProduct } from '@/types';
import { FunctionComponent } from 'react';
import ProductItem from './ProductItem';

interface ProductListProps {
  data: IProduct[];
}

const ProductList: FunctionComponent<ProductListProps> = ({ data }) => {
  return (
    <div
      className={'gap-4 px-4 mt-4'}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(300px, 1fr))',
      }}
    >
      {data.map((product: IProduct) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
