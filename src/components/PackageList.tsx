import React from 'react';
import {
  Card,
  Text,
  Title,
  TextInput,
  ActionIcon,
  useMantineTheme,
  SegmentedControl,
  Pagination,
  Group,
  Avatar,
  Flex,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import {
  IconBrandFacebook,
  IconBriefcase,
  IconDiscountCheckFilled,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react';
import PackageCard from './PackageCard';

type Props = {};

const PACKAGES = [
  {
    id: 234343,
    guide: 'Fit & Travel',
    name: 'Fisherman’s Village Resort ชุมชนคุณธรรมท่องเที่ยวบางปู 3 วัน 2 คืน @บ้านบาลาดูวอ จังหวัดปัตตานี',
    status: 'จองแล้ว',
    price: 2000,
    total: 3000,
  },
  {
    id: 56456345,
    guide: 'Fit & Travel',
    name: 'Fisherman’s Village Resort ชุมชนคุณธรรมท่องเที่ยวบางปู 3 วัน 2 คืน @บ้านบาลาดูวอ จังหวัดปัตตานี',
    status: 'รอชำระเงิน',
    price: 20230,
    total: 30034,
  },
  {
    id: 3456234,
    guide: 'Fit & Travel',
    name: 'Fisherman’s Village Resort ชุมชนคุณธรรมท่องเที่ยวบางปู 3 วัน 2 คืน @บ้านบาลาดูวอ จังหวัดปัตตานี',
    status: 'ล้มเหลว',
    price: 25400,
    total: 30230,
  },
];

const PackageList = (props: Props) => {
  const router = useRouter();
  return (
    <div
      className={'gap-4 mt-4'}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(300px, 1fr))',
      }}
    >
      {new Array(8).fill('').map((data: any, idx: number) => (
        <PackageCard key={idx} />
      ))}
    </div>
  );
};

export default PackageList;
