'use client';
import { cn } from '@/libs/utils';
import { Button, Text, Title, Pagination } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IPackage } from '@/types';
import PackageCard from './PackageItem';

type Props = {
  pkgs: IPackage[];
  showPagination?: boolean;
  showMore?: boolean;
  className?: string;
};

const RecommendedTourPackages = ({
  pkgs,
  className,
  showPagination,
  showMore,
}: Props) => {
  const router = useRouter();
  return (
    <div className={cn(className)}>
      <div className='text-center'>
        <Title>แพ็กเกจทัวร์แนะนำ</Title>
        <Text>ตอบโจทย์ทุกไลฟ์สไตล์</Text>
      </div>
      <div
        className={'gap-4 px-4 mt-4'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(300px, 1fr))',
        }}
      >
        {pkgs.slice(0, 6).map((pkg: IPackage) => (
          <PackageCard pkg={pkg} key={pkg.id} />
        ))}
      </div>
      <div className={cn('px-4 mt-4', showMore ? 'text-center' : 'text-end')}>
        {showPagination && (
          <Pagination total={10} size='sm' className='w-fit m-auto' />
        )}
        {showMore && <Button variant='subtle'>ดูเพิ่มเติม</Button>}
      </div>
      {/* <div className='text-center mt-4'>
        <Button variant='subtle' onClick={() => router.push('destination')}>
          ดูเพิ่มเติม
        </Button>
      </div> */}
    </div>
  );
};

export default RecommendedTourPackages;
