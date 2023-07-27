'use client';
import { Button, Tabs } from '@mantine/core';
import React from 'react';
import PackageList from './PackageList';
import PersonalInfo from './PersonalInfo';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

type Props = {
  className: string;
};

const TravelTabs = ({ className }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Tabs
      value={searchParams.get('tab') || 'personal'}
      className={className}
      onTabChange={(e) => router.push(`/account?tab=${e}`)}
    >
      <Tabs.List>
        <Tabs.Tab value='personal'>ข้อมูลส่วนตัว</Tabs.Tab>
        <Tabs.Tab value='booking'>การจองแพ็กเกจ</Tabs.Tab>
        <Tabs.Tab value='order'>คำสั่งซื้อ</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='personal' pt='xs'>
        <PersonalInfo className='m-auto' />
      </Tabs.Panel>
      <Tabs.Panel value='booking' pt='xs'>
        <PackageList data={[]} />
      </Tabs.Panel>
      <Tabs.Panel value='order' pt='xs'>
        order
      </Tabs.Panel>
    </Tabs>
  );
};

export default TravelTabs;
