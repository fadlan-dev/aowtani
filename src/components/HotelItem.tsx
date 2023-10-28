import { IPartner } from '@/types';
import {
  ActionIcon,
  AspectRatio,
  Card,
  Flex,
  Text,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import { IconBrandFacebook, IconPhone } from '@tabler/icons-react';

interface HotelItemProps {
  partner: IPartner;
}

const HotelItem: FunctionComponent<HotelItemProps> = ({ partner }) => {
  const theme = useMantineTheme();
  return (
    <Link href={`hotel/${partner.id}`}>
      <Card padding='md' className='cursor-pointer hover:shadow transition'>
        <Card.Section>
          <AspectRatio ratio={16 / 9}>
            <Image
              className='bg-zinc-200 object-contain'
              src={
                partner.images[0]?.asset
                  ? `${process.env.NEXT_IMAGE_HOST}${partner.images[0]?.asset}`
                  : './image.svg'
              }
              alt={partner.name}
              fill
            />
          </AspectRatio>
        </Card.Section>
        <Text size='lg' weight={500} mt={8} lineClamp={1}>
          {partner.name}
        </Text>
        <Text size='xs' className='text-primary' lineClamp={1}>
          {partner.address}
        </Text>
        <Text lineClamp={2}>{partner.detail}</Text>
        <Flex gap={8} mt={8} className='text-primary'>
          {partner.facebook && (
            <Link href={partner.facebook} target='_blank'>
              <ActionIcon
                radius='lg'
                color={theme.primaryColor}
                variant='light'
              >
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
    </Link>
  );
};

export default HotelItem;
