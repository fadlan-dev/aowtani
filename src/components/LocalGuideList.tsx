'use client';
import { cn } from '@/libs/utils';
import {
  Button,
  Text,
  Title,
  TextInput,
  ActionIcon,
  useMantineTheme,
  Pagination,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import LocalGuideItem from './LocalGuideItem';
import { ILocalGuide } from '@/types';
import Empty from './Empty';

type Props = {
  data: ILocalGuide[];
  total: number;
  showSearch?: boolean;
  showPagination?: boolean;
  showMore?: boolean;
  className?: string;
  title?: string;
  subTitle?: string;
};

const LocalGuidList = ({
  data,
  total,
  className,
  showSearch,
  showPagination,
  showMore,
  title = 'สถานที่ท่องเที่ยว',
  subTitle,
}: Props) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleRoute = ({ page = '1' }: { page?: string }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (page) {
      newParams.set('page', `${page}`);
    }

    router.push(`${pathname}?${newParams}`);
  };

  return (
    <div className={cn(className)}>
      <div className='text-center '>
        {title && <Title weight='bold'>{title}</Title>}
        {subTitle && <Text className='mt-2'>{subTitle}</Text>}
        {showSearch && (
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
        )}
      </div>
      <div className='p-4'>
        {/* <Button
          variant='gradient'
          leftIcon={<IconPlus />}
          onClick={() => router.push('/local-guides/create')}
        >
          สมัครเป็นไกด์ท้องถิ่น
        </Button> */}
      </div>
      {data.length === 0 ? (
        <Empty className='px-4 mt-10 md:mt-4' />
      ) : (
        <>
          <div className={'grid grid-cols-list gap-4 mt-4'}>
            {data.map((guide: ILocalGuide) => (
              <LocalGuideItem data={guide} key={guide.id} />
            ))}
          </div>
          <div
            className={cn('px-4 mt-4', showMore ? 'text-center' : 'text-end')}
          >
            {total > 6 && showPagination && (
              <Pagination
                total={total}
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

export default LocalGuidList;
