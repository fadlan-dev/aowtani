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
import { facebookLink } from '@/libs/utils';
import { useRouter } from "next/navigation";

interface RestaurantItemProps {
  partner: IPartner;
}

const RestaurantItem: FunctionComponent<RestaurantItemProps> = ({
  partner,
}) => {
  const router = useRouter();
  const theme = useMantineTheme();

  return (
      <Card padding='md' className='cursor-pointer hover:shadow transition'>
        <Card.Section onClick={() => router.push(`restaurant/${partner.id}`)}>
          <AspectRatio ratio={16 / 9}>
            <Image
              className='bg-zinc-200 object-cover'
              src={
                partner.images ? 
                partner.images[0]?.asset
                  ? `${process.env.NEXT_IMAGE_HOST}${partner.images[0]?.asset}`
                  : './image.svg'
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
        <Flex gap={8} mt={8} direction="column" className="text-primary">
        {partner.facebook && (
          <Link
            href={facebookLink(partner.facebook)}
            target="_blank"
            className="flex items-center gap-3"
          >
            <ActionIcon radius="lg" color={theme.primaryColor} variant="light">
              <IconBrandFacebook size={14} target="_blank" />
            </ActionIcon>
            <Text size="sm" color="black" className="hover:underline">
              {partner.facebook}
            </Text>
          </Link>
        )}
        {partner.phone && (
          <Link
            href={`tel:${partner.phone}`}
            className="flex items-center gap-3"
          >
            <ActionIcon radius="lg" color={theme.primaryColor} variant="light">
              <IconPhone size={14} />
            </ActionIcon>
            <Text size="sm" color="black" className="hover:underline">
              {partner.phone}
            </Text>
          </Link>
        )}
      </Flex>
      </Card>
  );
};

export default RestaurantItem;
