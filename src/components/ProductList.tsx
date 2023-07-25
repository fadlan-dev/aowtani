'use client';
import { IProduct } from '@/types';
import { FunctionComponent } from 'react';
import ProductItem from './ProductItem';
import Empty from './Empty';

interface ProductListProps {
  data: IProduct[];
}

const ProductList: FunctionComponent<ProductListProps> = ({ data }) => {
  if (data.length === 0) {
    return <Empty className='px-4 mt-10 md:mt-4' />;
  }

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
