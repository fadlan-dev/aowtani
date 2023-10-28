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
}

const HotelList: FunctionComponent<HotelListProps> = ({
  data,
  total,
  className,
  showMore,
}) => {
  const router = useRouter();

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
        {showMore && (
          <Button
            variant='subtle'
            onClick={() => router.push(`/partner?type=Hotel`)}
          >
            ดูเพิ่มเติม
          </Button>
        )}
      </div>
    </>
  );
};

export default HotelList;
