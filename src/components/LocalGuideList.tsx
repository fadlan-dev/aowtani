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
import { useRouter } from 'next/navigation';
import LocalGuideItem from './LocalGuideItem';
import { ILocalGuide } from '@/types';

type Props = {
  data: ILocalGuide[];
  showSearch?: boolean;
  showPagination?: boolean;
  showMore?: boolean;
  className?: string;
  title?: string;
  subTitle?: string;
};

const LocalGuidList = ({
  data,
  className,
  showSearch,
  showPagination,
  showMore,
  title = 'สถานที่ท่องเที่ยว',
  subTitle,
}: Props) => {
  const router = useRouter();
  const theme = useMantineTheme();
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
      <div className={'grid grid-cols-list gap-4 px-4 mt-4'}>
        {data.map((guide: ILocalGuide) => (
          <LocalGuideItem data={guide} key={guide.id} />
        ))}
      </div>
      <div className={cn('px-4 mt-4', showMore ? 'text-center' : 'text-end')}>
        {showPagination && (
          <Pagination total={10} size='sm' className='w-fit m-auto' />
        )}
        {showMore && (
          <Button variant='subtle' onClick={() => router.push('/destination')}>
            ดูเพิ่มเติม
          </Button>
        )}
      </div>
    </div>
  );
};

export default LocalGuidList;
