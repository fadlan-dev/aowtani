'use client';
import { cn } from '@/libs/utils';
import { Avatar, Card, Flex, Group, Text } from '@mantine/core';
import {
  IconBrandFacebook,
  IconDiscountCheckFilled,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

type Props = {
  className?: string;
};

const LocalGuidCard = ({ className }: Props) => {
  const router = useRouter();
  return (
    <Card
      padding='md'
      onClick={() => router.push(`local-guides/${1}`)}
      className={cn(className, 'cursor-pointer')}
    >
      <Flex justify='space-between'>
        <Group>
          <Avatar
            radius='xl'
            src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
          />
          <Text weight={500} size='lg'>
            นายยิ้ม หวาน
          </Text>
        </Group>
        <IconDiscountCheckFilled className='text-primary' />
      </Flex>
      <Group align='baseline' spacing={4} className='text-primary'>
        <IconMapPin size={12} />
        <Text size='sm'>แหลมตาชี</Text>
      </Group>
      <Text lineClamp={3}>
        จุดเริ่มต้นของ ดับเบิ้ลเอ็นจอย.คอม เกิดขึ้นแบบไม่ได้ตั้งใจ
        เพราะผมไม่เคยคิดว่า สักวันหนึ่ง ผมจะเป็นเจ้าของบริษัททัวร์
        แต่มันเกิดขึ้นด้วยความบังเอิญ หรือโชคชะตา ผมก็ไม่ทราบได้ แต่หลังจากนี้
        ผมจะตั้งใจทำอย่างดีที่สุด
      </Text>
      <Group className='text-primary'>
        <Text>#ขับเรือได้</Text>
        <Text>#พูดได้หลายภาษา</Text>
      </Group>
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
  );
};

export default LocalGuidCard;
