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
          { label: 'ทั้งหมด', value: '' },
          { label: 'ที่พัก', value: 'Hotel' },
          { label: 'ร้านอาหารและคาเฟ่', value: 'Restaurant' },
          { label: 'ทัวร์ท่องเที่ยว', value: 'TourActivity' },
          { label: 'ของฝาก', value: 'Shop' },
          { label: 'อื่น ๆ', value: 'Other' },
        ]}
      />
    </div>
  );
};

export default PartnerFilter;
