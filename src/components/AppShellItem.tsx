'use client';
import {
  Box,
  Group,
  Loader,
  Navbar,
  Text,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import DestinationList from './DestinationList';
import { FoodIcon, MosqueIcon, ResortIcon, TravelIcon } from './Icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/libs/utils';
import { IDestination, IPackage, IPartner, IProduct } from '@/types';
import ProductList from './ProductList';
import PackageList from './PackageList';
import ExploreButton from './ExploreButton';
import DestinationMap from './DestinationMap';
import { useCallback } from 'react';
import { getDestinations } from '@/libs/services/getDestinations';
import { getPackages } from '@/libs/services/getPackages';
import { getProducts } from '@/libs/services/getProducts';
import { getPartners } from '@/libs/services/getPartners';
import { useQuery } from '@tanstack/react-query';
import HotelList from './HotelList';
import RestaurantList from './RestaurantList';

type Props = {};

const Index = ({}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const variant = searchParams.get('t') || 'destination';
  const theme = useMantineTheme();
  const MENUS = [
    {
      key: 'destination',
      title: 'สถานที่ท่องเที่ยว',
      icon: <TravelIcon />,
      color: 'blue',
      active: theme.colors.blue[0],
    },
    {
      key: 'hotel',
      title: 'ที่พักผ่อน',
      icon: <ResortIcon />,
      color: 'green',
      active: theme.colors.green[0],
    },
    {
      key: 'restaurant',
      title: 'อาหารจานโปรด',
      icon: <FoodIcon />,
      color: 'violet',
      active: theme.colors.violet[0],
    },
    {
      key: 'mosque',
      title: 'มัสยิด',
      icon: <MosqueIcon />,
      color: 'orange',
      active: theme.colors.orange[0],
    },
  ];

  const contentRender = useCallback(() => {
    switch (variant) {
      case 'destination':
        return <DestinationItem />;

      case 'hotel':
        return <HotelItem />;

      case 'restaurant':
        return <RestaurantItem />;
      case 'mosque':
        return <MosqueItem />;
    }
  }, [variant]);

  return (
    <div className='flex pt-[60px]'>
      <div className='w-72 min-w-[288px] min-h-[calc(100vh-143px)] hidden md:block'>
        <Navbar hiddenBreakpoint='sm' className='h-full'>
          {MENUS.map((menu) => (
            <Navbar.Section
              key={menu.title}
              className={cn(`p-2 cursor-pointer`)}
              bg={variant === menu.key ? menu.active : ''}
              onClick={() =>
                menu.key !== variant && router.push(`?t=${menu.key}`)
              }
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
      <div className='flex-auto overflow-auto py-10'>{contentRender()}</div>
    </div>
  );
};

export default Index;

const LoaderItem = () => (
  <center className='my-6'>
    <Loader variant='dots' />
  </center>
);

const DestinationItem = () => {
  const { data: destinations, isLoading: loadingDestination } = useQuery({
    queryKey: ['destination'],
    queryFn: () =>
      getDestinations({
        per_page: 3,
        search: '',
      }),
  });

  const { data: pkgs, isLoading: loadingPackage } = useQuery({
    queryKey: ['packages'],
    queryFn: () =>
      getPackages({
        per_page: 3,
        search: '',
      }),
  });

  const { data: products, isLoading: loadingProduct } = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      getProducts({
        per_page: 3,
        search: '',
      }),
  });

  return (
    <>
      <center>
        <h1>สถานที่ท่องเที่ยว</h1>
        <p>เลือกรายการสถานที่ท่องเที่ยวตามไลฟ์สไตล์ของคุณ</p>
      </center>
      {loadingDestination ? (
        <LoaderItem />
      ) : (
        <DestinationList
          total={1}
          data={(destinations?.data || []) as IDestination[]}
          className='mt-6 mb-6'
          showMore
        />
      )}

      <div className='mt-10'>
        <center>
          <h1>แพ็กเกจทัวร์แนะนำ</h1>
          <p>ตอบโจทย์ทุกไลฟ์สไตล์</p>
        </center>
        {loadingPackage ? (
          <LoaderItem />
        ) : (
          <PackageList
            className='mt-4 px-4'
            data={pkgs?.data || ([] as IPackage[])}
          />
        )}
      </div>
      <div className='mt-10'>
        <center>
          <h1>สินค้ายอดนิยม</h1>
          <p>ช้อปปิ้งได้ทุกเวลา</p>
        </center>
        {loadingProduct ? (
          <LoaderItem />
        ) : (
          <ProductList total={1} data={products?.data || ([] as IProduct[])} />
        )}
        {products?.data.length !== 0 && (
          <ExploreButton className='mt-2' to='product' />
        )}
      </div>
    </>
  );
};

const HotelItem = () => {
  const { data: hotels, isLoading } = useQuery({
    queryKey: ['hotels'],
    queryFn: () => getPartners({ type: 'Hotel', per_page: 3, search: '' }),
  });
  return (
    <>
      <center>
        <h1>ที่พัก</h1>
        <p>ที่ตอบโจทย์ทุกไลฟ์สไตล์</p>
      </center>
      {isLoading ? (
        <LoaderItem />
      ) : (
        <HotelList
          data={(hotels?.data || []) as IPartner[]}
          total={Number(hotels?.total || 0)}
          showMore
        />
      )}
    </>
  );
};

const RestaurantItem = () => {
  const { data: restaurants, isLoading } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => getPartners({ type: 'Restaurant', per_page: 3, search: '' }),
  });
  return (
    <>
      <center>
        <h1>อาหารจานโปรด</h1>
        <p>อร่อยทุกเมนู</p>
      </center>
      {isLoading ? (
        <LoaderItem />
      ) : (
        <RestaurantList
          data={(restaurants?.data || []) as IPartner[]}
          total={Number(restaurants?.total || 0)}
          showMore
        />
      )}
    </>
  );
};

const MosqueItem = () => {
  const { data: mosques, isLoading } = useQuery({
    queryKey: ['mosques'],
    queryFn: () =>
      getDestinations({
        destination_type_id: '12',
        per_page: 3,
        search: '',
      }),
  });
  return (
    <>
      <center>
        <h1>มัสยิด</h1>
        <p>ศาสนสถาน</p>
      </center>
      {isLoading ? (
        <LoaderItem />
      ) : (
        <DestinationList
          total={1}
          data={(mosques?.data || []) as IDestination[]}
          className='mt-6 mb-6'
          showMoreType='12'
          showMore
        />
      )}
    </>
  );
};
