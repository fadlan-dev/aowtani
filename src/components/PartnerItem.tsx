'use client';
import { cn } from '@/libs/utils';
import { IPartner } from '@/types';
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
  IconBriefcase,
  IconDiscountCheckFilled,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';

interface PartnerCardProps {
  partner: IPartner;
  className?: string;
}

const PartnerCard: FunctionComponent<PartnerCardProps> = ({
  className,
  partner,
}) => {
  const router = useRouter();
  const theme = useMantineTheme();
  return (
    <Card
      padding='md'
      onClick={() => router.push(`partner/${partner.id}`)}
      className={cn(className, 'cursor-pointer transition-all hover:shadow')}
    >
      <Group position='apart'>
        <Group spacing={8}>
          <Avatar
            radius='xl'
            src={
              `${process.env.NEXT_PUBLIC_URL}${partner.images[0]?.asset}` ||
              '/image.svg'
            }
            alt={partner.name}
          />
          <Text>{partner.name}</Text>
        </Group>
        <IconDiscountCheckFilled className='text-primary' />
      </Group>
      <Flex align='center' gap={4} mt={4} className='text-primary'>
        <IconBriefcase size={14} />
        <Text size='xs'>กิจกรรมทัวร์</Text>
      </Flex>
      {partner.address && (
        <Flex align='center' gap={4} mt={2} className='text-primary'>
          <IconMapPin size={14} />
          <Text size='xs' lineClamp={1}>
            {partner.address}
          </Text>
        </Flex>
      )}
      <Text lineClamp={3} mt={4}>
        {partner.detail}
      </Text>
      <Flex gap={8} mt={8} className='text-primary'>
        {partner.facebook && (
          <Link href={partner.facebook} target='_blank'>
            <ActionIcon radius='lg' color={theme.primaryColor} variant='light'>
              <IconBrandFacebook size={14} target='_blank' />
            </ActionIcon>
          </Link>
        )}
        {partner.phone && (
          <ActionIcon radius='lg' color={theme.primaryColor} variant='light'>
            <IconPhone size={14} />
          </ActionIcon>
        )}
      </Flex>
    </Card>
  );
};

export default PartnerCard;
