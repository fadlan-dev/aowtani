'use client';
import { cn } from '@/libs/utils';
import { ILocalGuide } from '@/types';
import {
  ActionIcon,
  Avatar,
  Card,
  Flex,
  Group,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  IconBrandFacebook,
  IconDiscountCheckFilled,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  data: ILocalGuide;
  className?: string;
};

const LocalGuideItem = ({ className, data }: Props) => {
  const router = useRouter();
  const theme = useMantineTheme();
  return (
    <Card
      padding='md'
      onClick={() => router.push(`local-guides/${data.id}`)}
      className={cn(className, 'cursor-pointer')}
    >
      <Flex justify='space-between' align='center'>
        <Group spacing={4}>
          <Avatar
            radius='xl'
            src={`${process.env.NEXT_PUBLIC_URL}${data.profile.asset}`}
          />
          <Text weight={500} size='lg'>
            {data.name}
          </Text>
        </Group>
        <IconDiscountCheckFilled className='text-primary' />
      </Flex>
      <Group align='baseline' spacing={4} className='text-primary'>
        <IconMapPin size={12} />
        <Text size='sm'>{data.address}</Text>
      </Group>
      <Text lineClamp={3}>{data.detail}</Text>
      <Group className='text-primary'>
        <Text>#ขับเรือได้</Text>
        <Text>#พูดได้หลายภาษา</Text>
      </Group>
      <Flex gap={8} mt={8} className='text-primary'>
        <Link href={data.facebook} target='_blank'>
          <ActionIcon radius='lg' color={theme.primaryColor} variant='light'>
            <IconBrandFacebook size={14} />
          </ActionIcon>
        </Link>
        <Link href={`tel:${data.phone}`} target='_blank'>
          <ActionIcon radius='lg' color={theme.primaryColor} variant='light'>
            <IconPhone size={14} />
          </ActionIcon>
        </Link>
      </Flex>
    </Card>
  );
};

export default LocalGuideItem;
