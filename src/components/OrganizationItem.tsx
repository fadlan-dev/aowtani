'use client';
import {
  ActionIcon,
  AspectRatio,
  Avatar,
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
import { isValidUrl } from '@/libs/utils';
import { useRouter } from 'next/navigation';

interface OrganizationItemProps {
  data: IOrganization;
  height?: number | string
}

const OrganizationItem: FunctionComponent<OrganizationItemProps> = ({
  data,
  height = 'auto'
}) => {
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <Card onClick={() => router.push(`organizations/${data.id}`)} className='cursor-pointer'>
      <Card.Section >
        <AspectRatio ratio={16 / 9} style={{height: height}}>
          <Image
            className='bg-zinc-200 object-cover'
            src={
              data.banner
                ? `${process.env.NEXT_IMAGE_HOST}${data.banner.asset}`
                : './image.svg'
            }
            alt={data.name}
            fill
          />
        </AspectRatio>
      </Card.Section>
      <Group mt='sm' spacing='sm' align='center'>
        <Avatar
          radius='xl'
          src={
            data.logo
              ? `${process.env.NEXT_IMAGE_HOST}${data.logo.asset}`
              : './image.svg'
          }
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
      <Flex gap={8} mt={8} className='text-primary' direction="column">
        {data.website !== 'no' && data.website && (
          <Link href={isValidUrl(data.website)} target='_blank'>
            <Group>
            <ActionIcon radius='lg' color={theme.primaryColor} variant='light'>
              <IconWorldWww size={14} />
            </ActionIcon>
            <Text color='black'>{data.website}</Text>
            </Group>
          </Link>
        )}
        {data.phone !== 'no' && data.phone && (
            <Link href={`tel:${data.phone}`} target='_blank'>
          <Group>

            <ActionIcon radius='lg' color={theme.primaryColor} variant='light'>
              <IconPhone size={14} />
            </ActionIcon>
            <Text color='black'>{data.phone}</Text>
          </Group>

          </Link>
        )}
      </Flex>
    </Card>
  );
};

export default OrganizationItem;
