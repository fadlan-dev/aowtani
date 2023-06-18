'use client';
import { cn } from '@/libs/utils';
import {
  Image,
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
import { useRouter } from 'next/navigation';

type Props = {
  showSearch?: boolean;
  className?: string;
  title?: string;
};

type Destination = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

const DestinationList = ({
  className,
  showSearch,
  title = 'สถานที่ท่องเที่ยว',
}: Props) => {
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
            placeholder='ค้นหาสถานที่ชอบ'
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
            <Card.Section>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
                  alt='Norway'
                />
              </AspectRatio>
            </Card.Section>
            <Text size='lg' weight={500} mt={8}>
              แหลมตาชี
            </Text>
            <Text size='xs' className='text-primary'>
              ปน.2062 ตำบล แหลมโพธิ์ อำเภอ ยะหริ่ง ปัตตานี 94150
            </Text>
            <Text lineClamp={3}>
              คงจะมีไม่กี่คนที่เคยไปเที่ยว ปัตตานี หนึ่งในจังหวัดของ ภาคใต้
              วันนี้เราเลยจะพาทุกคนไปดูหนึ่งที่เที่ยวสวยๆ อันซีนของจังหวัดนี้กัน
            </Text>
            <Button variant='light' fullWidth mt='md' radius='md'>
              ดูรายละเอียด
            </Button>
          </Card>
        ))}
      </div>
      <div className='px-4 mt-4 text-end'>
        <Pagination total={10} className='w-fit m-auto' />
      </div>
    </div>
  );
};

export default DestinationList;
