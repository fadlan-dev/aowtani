'use client';
import { useGetDestinationTypes } from '@/hooks/useDestinationTypes';
import { IDestinationType } from '@/types';
import {
  SegmentedControl,
  SegmentedControlItem,
  Skeleton,
} from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent, useCallback } from 'react';

interface DestinationFilterProps {}

const DestinationFilter: FunctionComponent<DestinationFilterProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {
    data: destinationTypes,
    isFetching,
    isFetched,
  } = useGetDestinationTypes();

  const renderSegmentedItem = useCallback(() => {
    const mapped: SegmentedControlItem[] =
      destinationTypes?.map((type: IDestinationType) => {
        return {
          label: type.name,
          value: `${type.id}`,
        };
      }) || [];

    return [{ label: 'ทั้งหมด', value: '' }, ...mapped];
  }, [destinationTypes]);
  const segmentedData = renderSegmentedItem();

  const handleRoute = ({
    destination_type_id = '',
  }: {
    destination_type_id?: string;
  }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('destination_type_id', `${destination_type_id}`);

    router.push(`${pathname}?${newParams}`);
  };

  return (
    <div className='flex justify-end p-4'>
      {isFetching && !isFetched ? (
        <Skeleton width={200} h={40} />
      ) : (
        <SegmentedControl
          value={(searchParams.get('destination_type_id') as string) || ''}
          onChange={(e) => handleRoute({ destination_type_id: e })}
          data={segmentedData}
        />
      )}
    </div>
  );
};

export default DestinationFilter;
