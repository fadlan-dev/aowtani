"use client";
import { cn, facebookLink } from "@/libs/utils";
import { IPartner } from "@/types";
import {
  ActionIcon,
  Avatar,
  Card,
  Flex,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBriefcase,
  IconDiscountCheckFilled,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

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
      padding="md"
      className={cn(className, "cursor-pointer transition-all hover:shadow")}
    >
      <Card.Section p="md" onClick={() => router.push(`partner/${partner.id}`)}>
        <Group position="apart">
          <Group spacing={8}>
            <Avatar
              radius="xl"
              src={
                `${process.env.NEXT_IMAGE_HOST}${partner.images[0]?.asset}` ||
                "/image.svg"
              }
              alt={partner.name}
            />
            <Text>{partner.name}</Text>
          </Group>
          <IconDiscountCheckFilled className="text-primary" />
        </Group>
        <Flex align="center" gap={4} mt={4} className="text-primary">
          <IconBriefcase size={14} />
          <Text size="xs">กิจกรรมทัวร์</Text>
        </Flex>
        {partner.address && (
          <Flex align="center" gap={4} mt={2} className="text-primary">
            <IconMapPin size={14} />
            <Text size="xs" lineClamp={1}>
              {partner.address}
            </Text>
          </Flex>
        )}
        <Text lineClamp={3} mt={4}>
          {partner.detail}
        </Text>
      </Card.Section>
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

export default PartnerCard;
