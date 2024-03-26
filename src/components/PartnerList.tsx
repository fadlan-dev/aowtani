'use client';
import { cn } from '@/libs/utils';
import { IPartner } from '@/types';
import { Pagination, Button } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PartnerItem from './PartnerItem';
import Empty from './Empty';

type Props = {
  data: IPartner[];
  total: number;
  showPagination?: boolean;
  showMore?: boolean;
  showMoreType?: string;
  className?: string;
  handleChange?: any;
  value?:number;
};

const PartnerList = ({
  data,
  total,
  className,
  showPagination,
  showMore,
  showMoreType,
  handleChange,
  value
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const handleRoute = ({ page = '1' }: { page?: string }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (page) {
      handleChange(page)
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
        {data.map((partner: IPartner) => (
          <PartnerItem key={partner.id} partner={partner} />
        ))}
      </div>
      <div className={cn('px-4 mt-4', showMore ? 'text-center' : 'text-end')}>
        {showPagination && total > 6 && (
          <Pagination
            total={total % 6 === 0 ? total / 6 : Math.floor(total / 6) + 1}
            value={Number(searchParams.get('page')) || value || 1}
            size='sm'
            className='w-fit m-auto'
            onChange={(page) => handleRoute({ page: `${page}` })}
          />
        )}
        {showMore && (
          <Button
            variant='subtle'
            onClick={() => router.push(`/partner?type=${showMoreType}`)}
          >
            ดูเพิ่มเติม
          </Button>
        )}
      </div>
    </>
  );
};

export default PartnerList;
