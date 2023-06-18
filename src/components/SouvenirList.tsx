'use client';
import { cn } from '@/libs/utils';
import {
  Card,
  Text,
  Title,
  TextInput,
  ActionIcon,
  useMantineTheme,
  SegmentedControl,
  Pagination,
  Group,
  Avatar,
  Flex,
} from '@mantine/core';
import {
  IconBrandFacebook,
  IconBriefcase,
  IconDiscountCheckFilled,
  IconMapPin,
  IconPhone,
  IconSearch,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

type Props = {
  showSearch?: boolean;
  className?: string;
  title?: string;
  subTitle: string;
};

type Destination = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

const SouvenirList = ({ className, showSearch, title }: Props) => {
  const router = useRouter();
  const theme = useMantineTheme();
  return (
    <div className={cn(className)}>
      <div className='text-center '>
        <Title weight='bold'>{title}</Title>
        <Text className='mt-2'>
          เลือกรายการสถานที่ท่องเที่ยวตามไลฟ์สไตล์ของคุณ
        </Text>
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
            placeholder='ค้นหาสถานทที่ต้องการ'
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
      <div
        className={'gap-4 px-4 mt-4'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(300px, 1fr))',
        }}
      >
        {new Array(8).fill('').map((data: Destination, idx: number) => (
          <Card
            key={idx}
            padding='md'
            onClick={() => router.push(`destination/${idx + 1}`)}
            className='cursor-pointer'
          >
            <Group position='apart'>
              <Group>
                <Avatar
                  radius='xl'
                  src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
                />
                <Text>Fit and Travel</Text>
              </Group>
              <IconDiscountCheckFilled className='text-primary' />
            </Group>
            <Group spacing='xs' className='text-primary mt-2'>
              <IconBriefcase size={14} />
              <Text size='xs'>กิจกรรมทัวร์</Text>
            </Group>
            <Flex align='flex-start' className='text-primary mt-1' gap={4}>
              <IconMapPin size={14} />
              <Text size='xs' lineClamp={1}>
                374 หมู่ที่ 8 ตำบลบานา อำเภอเมืองปัตตานี จังหวัดปัตตานี 94000
              </Text>
            </Flex>
            <Text lineClamp={3} mt={4}>
              Sint nostrud id fugiat veniam et dolore laboris ex do proident
              aliquip. Sint pariatur amet amet commodo Lorem cillum id quis
              Lorem tempor amet. Adipisicing cillum proident dolore aliqua elit
              adipisicing est id. Quis voluptate irure minim et ad quis
              reprehenderit tempor aliqua amet aliqua esse ad. Cillum aute dolor
              velit culpa. In excepteur incididunt quis ipsum cupidatat minim
              consectetur. Laboris irure et nulla reprehenderit sunt amet magna
              do reprehenderit dolor pariatur duis Lorem. Ad et non sint quis
              consectetur dolor amet laborum veniam non et minim est est. Ut sit
              nulla laboris enim minim consequat irure sint. Veniam quis aliquip
              minim id ad elit. Eiusmod enim deserunt aliquip eu in exercitation
              qui aliquip ullamco irure eu et commodo reprehenderit.
            </Text>
            <Flex gap={16} mt={8} className='text-primary'>
              <Group spacing='xs'>
                <IconBrandFacebook size={14} />
                <Text>Fit and Travel</Text>
              </Group>
              <Group spacing='xs'>
                <IconPhone size={14} />
                <Text>0723434556</Text>
              </Group>
            </Flex>
          </Card>
        ))}
      </div>
      <div className='px-4 mt-4 text-end'>
        <Pagination total={10} className='w-fit m-auto' />
      </div>
    </div>
  );
};

export default SouvenirList;
