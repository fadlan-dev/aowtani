'use client';
import { cn } from '@/libs/utils';
import {
  Button,
  Text,
  Title,
  TextInput,
  ActionIcon,
  useMantineTheme,
  SegmentedControl,
  Pagination,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { IDestination } from '@/types';
import DestinationCard from './DestinationItem';
import Empty from './Empty';

type Props = {
  showSearch?: boolean;
  showPagination?: boolean;
  showMore?: boolean;
  className?: string;
  title?: string;
  subTitle?: string;
  data?: IDestination[];
};

const DestinationList = ({
  className,
  showSearch,
  showPagination,
  showMore,
  title,
  subTitle,
  data,
}: Props) => {
  const router = useRouter();
  const theme = useMantineTheme();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tag = searchParams.get('t');

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
            <div className='p-4 text-end'>
              <SegmentedControl
                onChange={(e) => {
                  if (tag) {
                    router.push(`destination?t=${tag}&f=${e}`);
                    return;
                  }
                  router.push(`destination?f=${e}`);
                }}
                value={searchParams.get('f') || 'all'}
                data={[
                  { label: 'ทั้งหมด', value: 'all' },
                  { label: 'สถานที่', value: 'location' },
                  { label: 'ประเภท', value: 'type' },
                ]}
              />
            </div>
          </>
        )}
      </div>
      {data?.length === 0 ? (
        <Empty className='px-4 mt-10 md:mt-4' />
      ) : (
        <>
          <div
            className={'gap-4 px-4 mt-4'}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(300px, 1fr))',
            }}
          >
            {data?.map((dest: IDestination) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
          <div
            className={cn('px-4 mt-4', showMore ? 'text-center' : 'text-end')}
          >
            {showPagination && (
              <Pagination total={10} size='sm' className='w-fit m-auto' />
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
