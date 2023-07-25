'use client';
import { cn } from '@/libs/utils';
import { IPartner } from '@/types';
import {
  Text,
  Title,
  TextInput,
  ActionIcon,
  useMantineTheme,
  SegmentedControl,
  Pagination,
  Flex,
  Button,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import PartnerCard from './PartnerItem';
import Empty from './Empty';

type Props = {
  data: IPartner[];
  showSearch?: boolean;
  showPagination?: boolean;
  showMore?: boolean;
  className?: string;
  title?: string;
  subTitle?: string;
};

const PartnerList = ({
  data,
  className,
  showSearch,
  showPagination,
  showMore,
  title,
  subTitle,
}: Props) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const searchParams = useSearchParams();

  return (
    <div className={cn(className)}>
      <div className='text-center '>
        <Title weight='bold'>{title}</Title>
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
            placeholder='ค้นหาสถานที่ต้องการ'
            rightSectionWidth={42}
          />
        )}
      </div>
      <Flex mt='md' px='md' justify='end'>
        {/* <Button
          variant='gradient'
          leftIcon={<IconPlus />}
          onClick={() => router.push('/partner/create')}
        >
          สมัครเป็นผู้ประกอบการ
        </Button> */}
        <SegmentedControl
          defaultValue={searchParams.get('type') || ''}
          onChange={(e) => router.push(e ? `/partner?type=${e}` : '/partner')}
          data={[
            { label: 'ทั้งหมด', value: '' },
            { label: 'กิจกรรมทัวร์', value: 'TourActivity' },
            { label: 'ที่พัก', value: 'Hotel' },
            { label: 'ร้านอาหาร', value: 'Restaurant' },
            { label: 'ร้านค้า', value: 'Shop' },
          ]}
        />
      </Flex>
      {data.length === 0 ? (
        <Empty />
      ) : (
        <div
          className={'gap-4 px-4 mt-4'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(300px, 1fr))',
          }}
        >
          {data.map((partner: IPartner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      )}
      <div className={cn('px-4 mt-4', showMore ? 'text-center' : 'text-end')}>
        {showPagination && (
          <Pagination total={10} size='sm' className='w-fit m-auto' />
        )}
        {showMore && (
          <Button variant='subtle' onClick={() => router.push('/partner')}>
            ดูเพิ่มเติม
          </Button>
        )}
      </div>
    </div>
  );
};

export default PartnerList;
