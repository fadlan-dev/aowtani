'use client';
import { IMenu } from '@/types';
import {
  createStyles,
  Header as MHeader,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

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

const Header = () => {
  const pathname = usePathname();
  console.log('pathname', pathname);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  const router = useRouter();
  const { theme } = useStyles();

  return (
    <Box>
      <MHeader height={60} px='md' fixed>
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
      </MHeader>
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

export default Header;
