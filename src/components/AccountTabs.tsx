'use client';
import { Card, Loader, Tabs } from '@mantine/core';
import PersonalInfo from './PersonalInfo';
import { useRouter, useSearchParams } from 'next/navigation';
import PackageTable from './PackageTable';
import OrderTable from './OrderTable';
import { useSession } from 'next-auth/react';

type Props = {
  className: string;
};

const TravelTabs = ({ className }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: _session, status } = useSession();

  if (status === 'loading') {
    return (
      <center className='mt-6'>
        <Loader />
        <p>Authenticating</p>
      </center>
    );
  }
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
      <Card>
        <Tabs.Panel value='personal' pt='xs'>
          <PersonalInfo className='m-auto' />
        </Tabs.Panel>
        <Tabs.Panel value='booking' pt='xs'>
          <PackageTable />
        </Tabs.Panel>
        <Tabs.Panel value='order' pt='xs'>
          <OrderTable />
        </Tabs.Panel>
      </Card>
    </Tabs>
  );
};

export default TravelTabs;
