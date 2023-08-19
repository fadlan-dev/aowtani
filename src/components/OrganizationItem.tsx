'use client';
import {
  ActionIcon,
  AspectRatio,
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import { IOrganization } from '@/types';
import { IconMapPin, IconPhone, IconWorldWww } from '@tabler/icons-react';
import Link from 'next/link';

interface OrganizationItemProps {
  data: IOrganization;
}

const OrganizationItem: FunctionComponent<OrganizationItemProps> = ({
  data,
}) => {
  const theme = useMantineTheme();
  return (
    <Card maw='320px'>
      <Card.Section>
        <AspectRatio ratio={16 / 9}>
          <Image
            className='bg-zinc-200 object-contain'
            src={
              `${process.env.NEXT_PUBLIC_URL}${data.banner.asset}` ||
              './image.svg'
            }
            alt={data.name}
            fill
          />
        </AspectRatio>
      </Card.Section>
      <Group mt='sm' spacing='sm' align='center'>
        <Avatar
          radius='xl'
          src={`${process.env.NEXT_PUBLIC_URL}${data.logo.asset}`}
        />
        <Text size='lg' lineClamp={1} weight={500}>
          {data.name}
        </Text>
      </Group>
      <Group spacing={4} className='text-primary'>
        <IconMapPin size={12} />
        <Text size='sm' lineClamp={1}>
          {data.address}
        </Text>
      </Group>
      <Text lineClamp={2}>{data.detail}</Text>
      <Text weight='bold' mt='sm'>
        {data.president_name}
      </Text>
      <Flex gap={8} mt={8} className='text-primary'>
        <Link href={data.website} target='_blank' passHref={true}>
          <ActionIcon radius='lg' color={theme.primaryColor} variant='light'>
            <IconWorldWww size={14} />
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

export default OrganizationItem;
