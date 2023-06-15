'use client';
import { Group, Navbar, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import DestinationList from './DestinationList';
import { FoodIcon, ResortIcon, TravelIcon } from './Icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/libs/utils';
import RecommendedTourPackages from './RecommendedTourPackages';
import PopularProducts from './PopularProducts';

type Props = {};

const Index = (props: Props) => {
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
      <div className='w-72 hidden md:block'>
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
            </Navbar.Section>
          ))}
        </Navbar>
      </div>
      <div className='flex-auto overflow-auto mb-10'>
        <DestinationList
          title={MENUS.find((menu) => menu.key === t)?.title || ''}
          className='mt-6 mb-6'
        />
        <RecommendedTourPackages className='mt-10' />
        <PopularProducts className='mt-10' />
      </div>
    </div>
  );
};

export default Index;
