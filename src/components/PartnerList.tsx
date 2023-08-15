'use client';
import { calculateItemsPerPage, cn, getItemsPerPage } from '@/libs/utils';
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PartnerItem from './PartnerItem';
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
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const page = Number(searchParams.get('page')) || 1;

  return (
    <div className={cn(className)}>
      <div className='text-center px-4'>
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
          onChange={(type: string) => {
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set('page', '1');
            type === ''
              ? newParams.delete('type')
              : newParams.set('type', type);
            router.push(`${pathname}?${newParams}`);
          }}
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
        <Empty className='px-4 mt-10 md:mt-4' />
      ) : (
        <div className={'grid grid-cols-list gap-4 px-4 mt-4'}>
          {data.map((partner: IPartner) => (
            <PartnerItem key={partner.id} partner={partner} />
          ))}
        </div>
      )}
      <div className={cn('px-4 mt-4', showMore ? 'text-center' : 'text-end')}>
        {showPagination && (
          <Pagination
            total={calculateItemsPerPage(data.length, 6)}
            value={page}
            size='sm'
            className='w-fit m-auto'
            onChange={(page: number) => {
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set('page', `${page}`);
              router.push(`${pathname}?${newParams}`);
            }}
          />
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
