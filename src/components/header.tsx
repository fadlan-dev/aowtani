'use client';
import { IMenu } from '@/types';
import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const MENUS: IMenu[] = [
  {
    title: 'สถานที่ท่องเที่ยว',
    key: 'destination',
    path: '/destination',
  },
  {
    title: 'ของฝาก',
    key: 'souvenir',
    path: '/souvenir',
  },
  {
    title: 'ชุมชน',
    key: 'community',
    path: '/community',
  },
  {
    title: 'ผู้ประกอบการ',
    key: 'entrepreneurs',
    path: '/entrepreneurs',
  },
  {
    title: 'ไกด์ท้องถิ่น',
    key: 'local guides',
    path: '/local-guides',
  },
];

const linkClass =
  'flex items-center h-11 sm:h-full px-4 text-black font-medium no-underline hover:bg-primary-100';

const Index = () => {
  const pathname = usePathname();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <Box>
      <Header height={60} px='md' fixed>
        <Group position='apart' className='h-full'>
          <Link href='/' className=' no-underline text-black font-bold'>
            <div>Logo</div>
          </Link>

          <Group className='h-full hidden sm:flex gap-0'>
            {MENUS.map((menu: IMenu) => (
              <Link
                href={menu.path}
                key={menu.key}
                className={`${linkClass} ${
                  [menu.path].includes(pathname)
                    ? ' bg-primary-100 text-primary-700'
                    : ''
                }`}
              >
                {menu.title}
              </Link>
            ))}
            <Button ml='xs' onClick={() => router.push('/login')}>
              Log in
            </Button>
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className='block sm:hidden'
          />
        </Group>
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size='100%'
        padding='md'
        title={
          <Link
            onClick={closeDrawer}
            href='/'
            className='no-underline text-black'
          >
            Logo
          </Link>
        }
        className='block sm:hidden'
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx='-md'>
          <Divider
            my='sm'
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          {MENUS.map((menu: IMenu) => (
            <Link
              href={menu.path}
              key={menu.key}
              className={linkClass}
              onFocus={closeDrawer}
            >
              {menu.title}
            </Link>
          ))}
          <Divider
            my='sm'
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <Group position='center' grow pb='xl' px='md'>
            <Button variant='default'>Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Index;
