'use client';
import {
  Box,
  Group,
  Navbar,
  Text,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import DestinationList from './DestinationList';
import { FoodIcon, ResortIcon, TravelIcon } from './Icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/libs/utils';
import { IDestination, IPackage, IProduct } from '@/types';
import ProductList from './ProductList';
import PackageList from './PackageList';
import ExploreButton from './ExploreButton';
import DestinationMap from './DestinationMap';
import { useCallback } from 'react';

type Props = {
  destinations: { data: IDestination[]; total: number };
  pkgs: { data: IPackage[]; total: number };
  products: { data: IProduct[]; total: number };
};

const Index = ({ destinations, pkgs, products }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = searchParams.get('t') || 'travel';
  const theme = useMantineTheme();
  const MENUS = [
    {
      key: 'travel',
      title: 'สถานที่ท่องเที่ยว',
      icon: <TravelIcon />,
      color: 'blue',
      img: <DestinationMap />,
      active: theme.colors.blue[0],
    },
    {
      key: 'resort',
      title: 'ที่พักผ่อน',
      icon: <ResortIcon />,
      color: 'green',
      active: theme.colors.green[0],
    },
    {
      key: 'food',
      title: 'อาหารจานโปรด',
      icon: <FoodIcon />,
      color: 'violet',
      active: theme.colors.violet[0],
    },
  ];

  const contentRender = useCallback(
    (key: string) => {
      switch (key) {
        case 'travel':
          return (
            <>
              <center>
                <h1>สถานที่ท่องเที่ยว</h1>
                <p>เลือกรายการสถานที่ท่องเที่ยวตามไลฟ์สไตล์ของคุณ</p>
              </center>
              <DestinationList
                total={1}
                data={destinations.data}
                title={MENUS.find((menu) => menu.key === t)?.title || ''}
                className='mt-6 mb-6'
                showMore
              />
              <div className='mt-10'>
                <center>
                  <h1>แพ็กเกจทัวร์แนะนำ</h1>
                  <p>ตอบโจทย์ทุกไลฟ์สไตล์</p>
                </center>
                <PackageList className='mt-4 px-4' data={pkgs.data} />
              </div>
              <div className='mt-10'>
                <center>
                  <h1>สินค้ายอดนิยม</h1>
                  <p>ช้อปปิ้งได้ทุกเวลา</p>
                </center>
                <ProductList total={1} data={products.data} />
                {products.data.length !== 0 && (
                  <ExploreButton className='mt-2' to='product' />
                )}
              </div>
            </>
          );

        case 'resort':
          return (
            <>
              <center>
                <h1>ที่พัก</h1>
                <p>ที่ตอบโจทย์ทุกไลฟ์สไตล์</p>
              </center>
            </>
          );

        case 'food':
          return (
            <>
              <center>
                <h1>อาหารจานโปรด</h1>
                <p>อร่อยทุกเมนู</p>
              </center>
            </>
          );
      }
    },
    [destinations, pkgs, products]
  );

  return (
    <div className='flex pt-[60px]'>
      <div className='w-72 min-w-[288px] min-h-[calc(100vh-143px)] hidden md:block'>
        <Navbar hiddenBreakpoint='sm' className='h-full'>
          {MENUS.map((menu) => (
            <Navbar.Section
              key={menu.title}
              className={cn(`p-2 cursor-pointer`)}
              bg={t === menu.key ? menu.active : ''}
              onClick={() => menu.key !== t && router.push(`?t=${menu.key}`)}
            >
              <Group>
                <ThemeIcon variant='light' color={menu.color}>
                  {menu.icon}
                </ThemeIcon>
                <Text>{menu.title}</Text>
              </Group>
              {menu.img && (
                <Box h={138} mt='xs' className='relative'>
                  {menu.img}
                </Box>
              )}
            </Navbar.Section>
          ))}
        </Navbar>
      </div>
      <div className='flex-auto overflow-auto py-10'>
        {contentRender(searchParams.get('t') || 'travel')}
      </div>
    </div>
  );
};

export default Index;
