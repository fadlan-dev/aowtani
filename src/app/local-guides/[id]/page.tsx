'use client';
import PackageList from '@/components/PackageList';
import {
  Card,
  Group,
  Text,
  Avatar,
  Flex,
  Title,
  AspectRatio,
  Image,
} from '@mantine/core';
import {
  IconBrandFacebook,
  IconBriefcase,
  IconDiscountCheckFilled,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react';
import React from 'react';

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  return (
    <div className='mt-20 mb-20'>
      <div className='px-4'>
        <h1>โปรไฟล์ไกด์ท้องทิ่น</h1>
        <Card padding='lg' radius='md' mt='md'>
          <Group position='apart' mb='xs'>
            <Group>
              <Avatar
                radius='xl'
                src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
              />
              <Text weight={500}>Norway Fjord Adventures</Text>
            </Group>
            <IconDiscountCheckFilled className='text-primary' />
          </Group>

          <Group className='text-primary'>
            <IconMapPin size={14} />
            <Text size='sm'>
              374 หมู่ที่ 8 ตำบลบานา อำเภอเมืองปัตตานี จังหวัดปัตตานี 94000
            </Text>
          </Group>
          <Text>
            จุดเริ่มต้นของ ดับเบิ้ลเอ็นจอย.คอม เกิดขึ้นแบบไม่ได้ตั้งใจ
            เพราะผมไม่เคยคิดว่า สักวันหนึ่ง ผมจะเป็นเจ้าของบริษัททัวร์
            แต่มันเกิดขึ้นด้วยความบังเอิญ หรือโชคชะตา ผมก็ไม่ทราบได้
            แต่หลังจากนี้ ผมจะตั้งใจทำอย่างดีที่สุด
          </Text>
          <Group spacing={8} mt={4} className='text-primary'>
            <Text>#กิจกรรมทัวร์</Text>
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
      </div>
      <Flex mt='lg' mx='md' gap='md'>
        <div className='flex-1'>
          <Title order={3}>แพ็กเกจทัวร์</Title>
          <PackageList />
        </div>
        <div className='w-80'>
          <Title order={3}>สังกัดชุมชน</Title>
          <Card mt='md'>
            <Card.Section>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
                  alt='Norway'
                />
              </AspectRatio>
            </Card.Section>
            <Text size='lg' weight={500} mt={8}>
              ชุมชนบางปู
            </Text>
            <Text size='xs' className='text-primary'>
              ปน.2062 ตำบล แหลมโพธิ์ อำเภอ ยะหริ่ง ปัตตานี 94150
            </Text>
            <Text lineClamp={3}>
              พื้นที่อ่าวปัตตานีเป็นพื้นที่ป่าชายเลนขนาดใหญ่และอุดมสมบูรณ์แห่งหนึ่งของประเทศไทย
              ที่เปิดให้มีการท่องเที่ยวเชิงอนุรักษ์ธรรมชาติ
            </Text>
          </Card>
        </div>
      </Flex>
    </div>
  );
};

export default Page;
