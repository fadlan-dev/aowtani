'use client';
import { cn } from '@/libs/utils';
import { ICommunity } from '@/types';
import {
  Title,
  Text,
  TextInput,
  ActionIcon,
  useMantineTheme,
  SegmentedControl,
  Pagination,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import CommunityCard from './CommunityItem';

type Props = {
  data: ICommunity[];
  className?: string;
  title?: string;
  subTitle?: string;
  showSearch?: boolean;
};

const CommunityList = ({
  data,
  className,
  title,
  subTitle,
  showSearch,
}: Props) => {
  const theme = useMantineTheme();
  const router = useRouter();
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
      <div className='p-4 text-end'>
        <SegmentedControl
          data={[
            { label: 'ทั้งหมด', value: 'all' },
            { label: 'สถานที่', value: 'location' },
            { label: 'ประเภท', value: 'type' },
          ]}
        />
      </div>
      <div className={'grid grid-cols-list gap-4 px-4 mt-4'}>
        {data.map((commu: ICommunity) => {
          return <CommunityCard key={commu.id} community={commu} />;
        })}
      </div>
      <div className='px-4 mt-4 text-end'>
        <Pagination total={10} size='sm' className='w-fit m-auto' />
      </div>
    </div>
  );
};

export default CommunityList;
