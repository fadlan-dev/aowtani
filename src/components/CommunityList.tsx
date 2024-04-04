'use client';
import { cn } from '@/libs/utils';
import { ICommunity } from '@/types';
import { Pagination } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CommunityItem from './CommunityItem';
import Empty from './Empty';

type Props = {
  data: ICommunity[];
  total: number;
  className?: string;
};

const CommunityList = ({ data, total, className }: Props) => {
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
      <div className={cn(className, 'grid grid-cols-list gap-4 px-4 mt-4')}>
        {data.map((commu: ICommunity) => {
          return <CommunityItem key={commu.id} community={commu} />;
        })}
      </div> 
      <div className='px-4 mt-4 text-end'>
        {total > 6 && (
          <Pagination
            total={total % 6 === 0 ? total / 6 : Math.floor(total / 6) + 1}
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

export default CommunityList;
