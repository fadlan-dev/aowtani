'use client';
import { SegmentedControl } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent } from 'react';

interface PartnerFilterProps {}

const PartnerFilter: FunctionComponent<PartnerFilterProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleRoute = ({ type = '' }: { type?: string }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('type', `${type}`);

    router.push(`${pathname}?${newParams}`);
  };

  return (
    <div className='flex justify-end p-4'>
      <SegmentedControl
        value={(searchParams.get('type') as string) || ''}
        onChange={(e) => handleRoute({ type: e })}
        data={[
          { label: 'All', value: '' },
          { label: 'Hotel', value: 'Hotel' },
          { label: 'Restaurant', value: 'Restaurant' },
          { label: 'Tour Activity', value: 'TourActivity' },
          { label: 'Shop', value: 'Shop' },
        ]}
      />
    </div>
  );
};

export default PartnerFilter;
