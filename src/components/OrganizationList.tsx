'use client';
import { IOrganization } from '@/types';
import { Pagination } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { FunctionComponent } from 'react';
import Empty from './Empty';
import OrganizationItem from './OrganizationItem';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { cn } from '@/libs/utils';

interface OrganizationListProps {
  data: IOrganization[];
  total: number;
  showPagination?: boolean;
  showMore?: boolean;
  className?: string;
}

const OrganizationList: FunctionComponent<OrganizationListProps> = ({
  data,
  total,
  className,
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
        {data.map((organize: IOrganization) => (
          <OrganizationItem key={organize.id} data={organize} />
        ))}
      </div>
      <div>
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

export default OrganizationList;
