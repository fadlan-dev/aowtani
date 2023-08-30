'use client';
import { Button, Pagination } from '@mantine/core';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { IDestination } from '@/types';
import DestinationItem from './DestinationItem';
import Empty from './Empty';
import { cn } from '@/libs/utils';

type Props = {
  showPagination?: boolean;
  showMore?: boolean;
  className?: string;
  title?: string;
  subTitle?: string;
  data: IDestination[];
  total: number;
};

const DestinationList = ({
  showPagination,
  showMore,
  data,
  total,
  className,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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
      <div className={cn('grid grid-cols-list gap-4 px-4 mt-4', className)}>
        {data?.map((dest: IDestination) => (
          <DestinationItem key={dest.id} destination={dest} />
        ))}
      </div>
      <div className={cn('px-4 mt-4', showMore ? 'text-center' : 'text-end')}>
        {total > 6 && showPagination && (
          <Pagination
            total={total / 6}
            value={Number(searchParams.get('page')) || 1}
            size='sm'
            className='w-fit m-auto'
            onChange={(page) => handleRoute({ page: `${page}` })}
          />
        )}
        {showMore && (
          <Button variant='subtle' onClick={() => router.push('/destination')}>
            ดูเพิ่มเติม
          </Button>
        )}
      </div>
    </>
  );
};

export default DestinationList;
