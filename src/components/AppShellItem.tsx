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
import RecommendedTourPackages from './RecommendedTourPackages';
import PopularProducts from './PopularProducts';
import Image from 'next/image';
import { IDestination } from '@/types';

type Props = {
  destinations: IDestination[];
};

const Index = ({ destinations }: Props) => {
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
                    sizes='(max-width: 768px) 50vw,
              (max-width: 1200px) 20vw,
              10vw'
                  />
                </Box>
              )}
            </Navbar.Section>
          ))}
        </Navbar>
      </div>
      <div className='flex-auto overflow-auto mb-10'>
        <DestinationList
          data={destinations}
          title={MENUS.find((menu) => menu.key === t)?.title || ''}
          className='mt-6 mb-6'
          showMore
        />
        <RecommendedTourPackages className='mt-10' showMore />
        <PopularProducts className='mt-10' />
      </div>
    </div>
  );
};

export default Index;
