import { cn } from '@/libs/utils';
import { IPartner } from '@/types';
import { Button, Pagination } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent } from 'react';
import HotelItem from './HotelItem';
import Empty from './Empty';

interface HotelListProps {
  className?: string;
  data: IPartner[];
  total: number;
  showMore?: boolean;
  handleChange?: any
  value:number
}

const HotelList: FunctionComponent<HotelListProps> = ({
  data,
  total,
  className,
  showMore,
  handleChange,
  value
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
      <div className={cn('grid grid-cols-list gap-4 px-4 mt-4', className)}>
        {data?.map((partner: IPartner) => (
          <HotelItem key={partner.id} partner={partner} />
        ))}
      </div>
      <div className={cn('px-4 mt-4', showMore ? 'text-center' : 'text-end')}>

        <Pagination
          total={Math.ceil(total / 6)}
          value={value || 1}
          size='sm'
          className='w-fit m-auto'
          onChange={(page) => handleChange(page)}
        />

      </div>
    </>
  );
};

export default HotelList;
