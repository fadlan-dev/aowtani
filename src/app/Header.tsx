'use client';
import { IMenu } from '@/types';
import {
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
  Avatar,
  Popover,
  Text,
  Skeleton,
  Flex,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { IconLogout } from '@tabler/icons-react';

const MENUS: IMenu[] = [
  {
    title: 'แผนที่',
    key: 'map',
    path: '/map',
  },
  {
    title: 'สถานที่ท่องเที่ยว',
    key: 'destination',
    path: '/destination',
  },
  {
    title: 'ของฝาก',
    key: 'product',
    path: '/product',
  },
  {
    title: 'ชุมชน',
    key: 'community',
    path: '/community',
  },
  {
    title: 'ผู้ประกอบการ',
    key: 'partner',
    path: '/partner',
  },
  {
    title: 'ไกด์ท้องถิ่น',
    key: 'local guides',
    path: '/local-guides',
  },
  {
    title: 'หน่วยงาน',
    key: 'organizations',
    path: '/organizations',
  },
  {
    title: 'ปฏิทินกิจกรรม',
    key: 'calendar',
    path: '/calendar',
  },
];

const linkClass =
  'flex items-center h-11 sm:h-full px-2 text-black font-medium no-underline hover:bg-primary-100';

const Index = () => {
  const pathname = usePathname();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const router = useRouter();
  const theme = useMantineTheme();

  const { data: session, status } = useSession();

  return (
    <Box>
      <Header height={60} px='md' fixed zIndex={10}>
        <Group position='apart' className='h-full'>
          <Link href='/' className=' no-underline text-black font-bold'>
            <Image height={32} width={98} src='/logo.svg' alt='aowtani' />
          </Link>

          <Group className='h-full hidden sm:flex gap-px'>
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
            {status === 'loading' ? (
              <Skeleton width={32} height={32} radius='xl' />
            ) : session ? (
              <Popover position='bottom-end' shadow='md'>
                <Popover.Target>
                  <Avatar
                    size='md'
                    radius='xl'
                    ml='sm'
                    src={`${process.env.NEXT_IMAGE_HOST}${session.user?.profile?.asset}`}
                  />
                </Popover.Target>
                <Popover.Dropdown>
                  <Link href='/account' className='text-black'>
                    <Box w={124} className=' overflow-hidden cu'>
                      <Text className='truncate'>{session.user?.username}</Text>
                    </Box>
                  </Link>
                  <Divider my='xs' />
                  <Button
                    variant='light'
                    className='cursor-pointer'
                    onClick={() => signOut()}
                    leftIcon={<IconLogout />}
                  >
                    Sign Out
                  </Button>
                </Popover.Dropdown>
              </Popover>
            ) : (
              <Link href={`/sign-in?callback=${pathname}`}>
                <Button ml='xs' variant='gradient'>
                  Sign In
                </Button>
              </Link>
            )}
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
            <Image height={32} width={98} src='/logo.svg' alt='aowtani' />
          </Link>
        }
        className='block sm:hidden'
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx='-md'>
          <Divider
            mt={0}
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
            {session ? (
              <Flex direction='column'>
                <Flex justify='space-between' align='center'>
                  <Flex direction='column'>
                    <Text size='md'>
                      {session.user?.first_name} {session.user?.last_name}
                    </Text>
                    <Text size='sm'>{session.user?.username}</Text>
                  </Flex>
                  <Avatar
                    radius='xl'
                    ml='sm'
                    src={`${process.env.NEXT_IMAGE_HOST}${session.user?.profile?.asset}`}
                  />
                </Flex>
                <Divider
                  my='sm'
                  color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                />
                <Button
                  variant='default'
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign Out
                </Button>
              </Flex>
            ) : (
              <Button
                variant='filled'
                onClick={() => {
                  closeDrawer();
                  router.push('/sign-in');
                }}
              >
                Sign In
              </Button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Index;
