'use client';
import { IProduct } from '@/types';
import { FunctionComponent } from 'react';
import ProductItem from './ProductItem';
import Empty from './Empty';
import { cn } from '@/libs/utils';
import { Pagination } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ProductListProps {
  className?: string;
  data: IProduct[];
  total: number;
}

const ProductList: FunctionComponent<ProductListProps> = ({
  className,
  data,
  total,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleRoute = ({ page = '1' }: { page?: string }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (page) {
      newParams.set('page', `${page}`);
    }

    router.push(`${pathname}?${newParams}`);
  };

  if (data.length === 0) {
    return <Empty className='px-4 mt-10 md:mt-4' />;
  }

  return (
    <>
      <div className={cn(className, 'grid grid-cols-list gap-4 px-4 mt-4')}>
        {data.map((product: IProduct) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className={cn('px-4 mt-4 text-end')}>
        {total > 6 && (
          <Pagination
            total={total / 6}
            value={Number(searchParams.get('page')) || 1}
            size='sm'
            className='w-fit m-auto'
            onChange={(page) => handleRoute({ page: `${page}` })}
          />
        )}
      </div>
    </>
  );
};

export default ProductList;
