'use client';
import { cn } from '@/libs/utils';
import {
  Button,
  Card,
  Text,
  AspectRatio,
  Title,
  TextInput,
  ActionIcon,
  useMantineTheme,
  SegmentedControl,
  Pagination,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { IDestination } from '@/types';

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
      <div
        className={'gap-4 px-4 mt-4'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(300px, 1fr))',
        }}
      >
        {data?.map((dest: IDestination, idx: number) => (
          <Card
            key={idx}
            padding='md'
            onClick={() => router.push(`destination/${dest.id}`)}
            className='cursor-pointer'
          >
            <Card.Section>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={
                    dest.banners[0]?.asset
                      ? `${process.env.NEXT_PUBLIC_URL}${dest.banners[0].asset}`
                      : 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
                  }
                  alt={dest.name}
                  fill
                />
              </AspectRatio>
            </Card.Section>
            <Text size='lg' weight={500} mt={8} lineClamp={1}>
              {dest.name}
            </Text>
            <Text size='xs' className='text-primary' lineClamp={1}>
              {dest.address}
            </Text>
            <Text lineClamp={2}>{dest.description}</Text>
            <Button
              variant='light'
              fullWidth
              mt='md'
              radius='md'
              onClick={() => router.push(`destination/${dest.id}`)}
            >
              ดูรายละเอียด
            </Button>
          </Card>
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

export default DestinationList;
