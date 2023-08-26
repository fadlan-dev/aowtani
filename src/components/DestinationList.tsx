'use client';
import {
  Button,
  Text,
  Title,
  TextInput,
  ActionIcon,
  useMantineTheme,
  SegmentedControl,
  Pagination,
  SegmentedControlItem,
  Skeleton,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { IDestination, IDestinationType } from '@/types';
import DestinationItem from './DestinationItem';
import Empty from './Empty';
import { useGetDestinationTypes } from '@/hooks/useDestinationTypes';
import { useCallback } from 'react';
import { cn } from '@/libs/utils';

type Props = {
  showSearch?: boolean;
  showPagination?: boolean;
  showMore?: boolean;
  className?: string;
  title?: string;
  subTitle?: string;
  data?: IDestination[];
  total: number;
};

const DestinationList = ({
  className,
  showSearch,
  showPagination,
  showMore,
  title,
  subTitle,
  data,
  total,
}: Props) => {
  const router = useRouter();
  const theme = useMantineTheme();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tag = searchParams.get('t');

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
    page = '1',
    destination_type_id = '',
  }: {
    page?: string;
    destination_type_id?: string;
  }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (page) {
      newParams.set('page', `${page}`);
    }

    newParams.set('destination_type_id', `${destination_type_id}`);
    router.push(`${pathname}?${newParams}`);
  };

  return (
    <div className={cn(className)}>
      <div className='text-center '>
        {title && <Title weight='bold'>{title}</Title>}
        {subTitle && <Text className='mt-2'>{subTitle}</Text>}
        {showSearch && (
          <>
            <TextInput
              className='max-w-md m-auto mt-4'
              icon={<IconSearch size='1.1rem' stroke={1.5} />}
              radius='xl'
              size='md'
              rightSection={
                <ActionIcon
                  size={32}
                  radius='xl'
                  color={theme.primaryColor}
                  variant='filled'
                >
                  <IconSearch size='1.1rem' stroke={1.5} />
                </ActionIcon>
              }
              placeholder='ค้นหาสถานที่ชอบ'
              rightSectionWidth={42}
            />
            {tag && <p className='mt-4'>#{tag}</p>}
            <div className='flex justify-end p-4'>
              {isFetching && !isFetched ? (
                <Skeleton width={200} h={40} />
              ) : (
                <SegmentedControl
                  value={
                    (searchParams.get('destination_type_id') as string) || ''
                  }
                  onChange={(e) => handleRoute({ destination_type_id: e })}
                  data={segmentedData}
                />
              )}
            </div>
          </>
        )}
      </div>
      {data?.length === 0 ? (
        <Empty className='px-4 mt-10 md:mt-4' />
      ) : (
        <>
          <div className={'grid grid-cols-list gap-4 px-4 mt-4'}>
            {data?.map((dest: IDestination) => (
              <DestinationItem key={dest.id} destination={dest} />
            ))}
          </div>
          <div
            className={cn('px-4 mt-4', showMore ? 'text-center' : 'text-end')}
          >
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
              <Button
                variant='subtle'
                onClick={() => router.push('/destination')}
              >
                ดูเพิ่มเติม
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DestinationList;
