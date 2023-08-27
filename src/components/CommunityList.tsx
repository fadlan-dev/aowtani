'use client';
import { cn } from '@/libs/utils';
import { ICommunity } from '@/types';
import {
  Title,
  Text,
  TextInput,
  ActionIcon,
  useMantineTheme,
  Pagination,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CommunityItem from './CommunityItem';
import Empty from './Empty';

type Props = {
  data: ICommunity[];
  total: number;
  className?: string;
  title?: string;
  subTitle?: string;
  showSearch?: boolean;
};

const CommunityList = ({
  data,
  total,
  className,
  title,
  subTitle,
  showSearch,
}: Props) => {
  const theme = useMantineTheme();
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

  return (
    <div className={cn(className)}>
      <div className='text-center '>
        <Title weight='bold'>{title}</Title>
        <Text className='mt-2'>{subTitle}</Text>
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
            placeholder='ค้นหาชุมชนที่ต้องการ'
            rightSectionWidth={42}
          />
        )}
      </div>
      <div className='p-4 text-end'></div>
      {data.length === 0 ? (
        <Empty className='px-4 mt-10 md:mt-4' />
      ) : (
        <>
          <div className={'grid grid-cols-list gap-4 px-4 mt-4'}>
            {data.map((commu: ICommunity) => {
              return <CommunityItem key={commu.id} community={commu} />;
            })}
          </div>
          <div className='px-4 mt-4 text-end'>
            {total > 6 && (
              <Pagination
                total={total}
                size='sm'
                className='w-fit m-auto'
                onChange={(page) => handleRoute({ page: `${page}` })}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CommunityList;
