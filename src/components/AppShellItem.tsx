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
import Image from 'next/image';
import { IDestination, IPackage, IProduct } from '@/types';
import ProductList from './ProductList';
import PackageList from './PackageList';
import ExploreButton from './ExploreButton';

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
      img: '/destination.png',
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
  return (
    <div className='flex mt-[60px]'>
      <div className='w-72 min-w-[288px] hidden md:block'>
        <Navbar hiddenBreakpoint='sm' className='h-full'>
          {MENUS.map((menu) => (
            <Navbar.Section
              key={menu.title}
              className={cn(`p-2 cursor-pointer`)}
              bg={t === menu.key ? menu.active : ''}
              onClick={() => router.push(`?t=${menu.key}`)}
            >
              <Group>
                <ThemeIcon variant='light' color={menu.color}>
                  {menu.icon}
                </ThemeIcon>
                <Text>{menu.title}</Text>
              </Group>
              {menu.img && (
                <Box h={138} mt='xs' className='relative'>
                  <Image
                    src={menu.img}
                    alt={menu.title}
                    fill
                    className='object-contain'
                    sizes='(max-width: 640px) 100vw,
                    (max-width: 1280px) 50vw,
                    (max-width: 1536px) 33vw,
                    25vw'
                  />
                </Box>
              )}
            </Navbar.Section>
          ))}
        </Navbar>
      </div>
      <div className='flex-auto overflow-auto mb-10'>
        <DestinationList
          total={1}
          data={destinations.data}
          subTitle='และพื้นที่ใกล้เคียง'
          title={MENUS.find((menu) => menu.key === t)?.title || ''}
          className='mt-6 mb-6'
          showMore
        />
        <div className='mt-10'>
          <h2 className='text-center text-3xl'>แพ็กเกจทัวร์แนะนำ</h2>
          <p className='text-center'>ตอบโจทย์ทุกไลฟ์สไตล์</p>
          <PackageList className='mt-4 px-4' data={pkgs.data} />
        </div>
        <div className='mt-10'>
          <h2 className='text-center text-3xl'>สินค้ายอดนิยม</h2>
          <p className='text-center'>ช้อปปิ้งได้ทุกเวลา</p>
          <ProductList total={1} data={products.data} />
          {products.data.length !== 0 && (
            <ExploreButton className='mt-2' to='product' />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
