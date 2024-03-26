'use client';
import { cn, facebookLink } from '@/libs/utils';
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
  // console.log(data)
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
            src={`${process.env.NEXT_IMAGE_HOST}${data.profile?.asset}`}
          />
          <Text weight={500} size='lg'>
            {data.name}
          </Text>
        </Group>
        <IconDiscountCheckFilled className={data.status === "approved" ? "text-primary" : "text-secondary" } />
      </Flex>
      <Group align='baseline' spacing={4} className='text-primary'>
        <IconMapPin size={12} />
        <Text size='sm'>{data.address}</Text>
      </Group>
      {/* <Text lineClamp={3}>{data.detail}</Text> */}
      <Group className='text-primary'>
        <Text>{data.experience}</Text>
      </Group>
      <Flex gap={8} mt={8} direction="column" className="text-primary">
        {data.facebook && (
          <Link
            href={facebookLink(data.facebook)}
            target="_blank"
            className="flex items-center gap-3"
          >
            <ActionIcon radius="lg" color={theme.primaryColor} variant="light">
              <IconBrandFacebook size={14} target="_blank" />
            </ActionIcon>
            <Text size="sm" color="black" className="hover:underline">
              {data.facebook}
            </Text>
          </Link>
        )}
        {data.phone && (
          <Link
            href={`tel:${data.phone}`}
            className="flex items-center gap-3"
          >
            <ActionIcon radius="lg" color={theme.primaryColor} variant="light">
              <IconPhone size={14} />
            </ActionIcon>
            <Text size="sm" color="black" className="hover:underline">
              {data.phone}
            </Text>
          </Link>
        )}
      </Flex>
    </Card>
  );
};

export default LocalGuideItem;
