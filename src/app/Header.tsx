"use client";
import { IMenu } from "@/types";
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
  ActionIcon,
  Navbar,
  ThemeIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLogout,
} from "@tabler/icons-react";
import { cn, isTokenExpired } from "@/libs/utils";
import { APP_SHELL_MENUS } from "@/components/AppShellItem";

const MENUS: IMenu[] = [
  {
    title: "แผนที่",
    key: "map",
    path: "/map",
  },
  {
    title: "สถานที่ท่องเที่ยว",
    key: "destination",
    path: "/destination",
  },
  // {
  //   title: "ของฝาก",
  //   key: "product",
  //   path: "/product",
  // },
  {
    title: "ชุมชนท่องเที่ยว",
    key: "community",
    path: "/community",
  },
  {
    title: "ผู้ประกอบการ",
    key: "partner",
    path: "/partner",
  },
  {
    title: "ไกด์ท้องถิ่น",
    key: "local guides",
    path: "/local-guides",
  },
  {
    title: "องค์กรจัดการท่องเที่ยว",
    key: "organizations",
    path: "/organizations",
  },
  // {
  //   title: "ปฏิทินกิจกรรม",
  //   key: "event",
  //   path: "/event",
  // },
];

const linkClass =
  "flex items-center h-11 sm:h-full px-2 text-black font-medium no-underline hover:bg-primary-100";

const Index = () => {
  const pathname = usePathname();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [collapsed, { toggle: toggleCollapsed, close: closeCollapsed }] =
    useDisclosure(false);
  const router = useRouter();
  const theme = useMantineTheme();

  const { data: session, status } = useSession();

  if (isTokenExpired(session?.user.token)) {
    signOut();
  }

  const searchParams = useSearchParams();
  const variant = searchParams.get("t") || "destination";

  return (
    <Box>
      <Drawer opened={collapsed} onClose={closeCollapsed}>
        <Navbar hiddenBreakpoint="sm" className="h-full">
          {APP_SHELL_MENUS.map((menu) => (
            <Navbar.Section
              key={menu.title}
              className={cn(`p-2 cursor-pointer`)}
              bg={variant === menu.key ? menu.active : ""}
              onClick={() => {
                menu.key !== variant && router.push(`?t=${menu.key}`);
                closeCollapsed();
              }}
            >
              <Group>
                <ThemeIcon variant="light" color={menu.color}>
                  {menu.icon}
                </ThemeIcon>
                <Text>{menu.title}</Text>
              </Group>
            </Navbar.Section>
          ))}
        </Navbar>
      </Drawer>
      <Header height={80} px="md" fixed zIndex={10}>
        <Group position="apart" className="h-full">
          <Group>
            <ActionIcon className=" block md:hidden" onClick={toggleCollapsed}>
              {!collapsed ? (
                <IconLayoutSidebarLeftExpand />
              ) : (
                <IconLayoutSidebarLeftCollapse />
              )}
            </ActionIcon>
            <Link
              href="/"
              className=" no-underline text-black font-bold md:pl-20"
            >
              <Image height={56} width={56} src="/logo.svg" alt="aowtani" />
            </Link>
          </Group>

          <Group className="h-full hidden sm:flex gap-px">
            {MENUS.map((menu: IMenu) => (
              <Link
                href={menu.path}
                key={menu.key}
                className={`${linkClass} ${
                  [menu.path].includes(pathname)
                    ? " bg-primary-100 text-primary-700"
                    : ""
                }`}
              >
                {menu.title}
              </Link>
            ))}
            {status === "loading" ? (
              <Skeleton width={32} height={32} radius="xl" />
            ) : session ? (
              <Popover position="bottom-end" shadow="md">
                <Popover.Target>
                  <Avatar
                    size="md"
                    radius="xl"
                    ml="sm"
                    src={`${process.env.NEXT_IMAGE_HOST}${session.user?.profile?.asset}`}
                  />
                </Popover.Target>
                <Popover.Dropdown>
                  <Link href="/account" className="text-black">
                    <Box w={124} className=" overflow-hidden cu">
                      <Text className="truncate">{session.user?.username}</Text>
                    </Box>
                  </Link>
                  <Divider my="xs" />
                  <Button
                    variant="light"
                    className="cursor-pointer"
                    onClick={() => signOut()}
                    leftIcon={<IconLogout />}
                  >
                    ออกจากระบบ
                  </Button>
                </Popover.Dropdown>
              </Popover>
            ) : (
              <Link href={`/sign-in?callback=${pathname}`}>
                <Button ml="xs" variant="gradient">
                  เข้าสู่ระบบ
                </Button>
              </Link>
            )}
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className="block sm:hidden"
          />
        </Group>
      </Header>
      <Drawer
        position="right"
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <Link
            onClick={closeDrawer}
            href="/"
            className="no-underline text-black"
          >
            <Image height={32} width={98} src="/logo.svg" alt="aowtani" />
          </Link>
        }
        className="block sm:hidden"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            mt={0}
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
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
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            {session ? (
              <Flex direction="column">
                <Flex justify="space-between" align="center">
                  <Flex direction="column">
                    <Text size="md">
                      {session.user?.first_name} {session.user?.last_name}
                    </Text>
                    <Text size="sm">{session.user?.username}</Text>
                  </Flex>
                  <Avatar
                    radius="xl"
                    ml="sm"
                    src={`${process.env.NEXT_IMAGE_HOST}${session.user?.profile?.asset}`}
                  />
                </Flex>
                <Divider
                  my="sm"
                  color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                />
                <Button
                  variant="default"
                  onClick={() => {
                    signOut();
                  }}
                >
                  ออกจากระบบ
                </Button>
              </Flex>
            ) : (
              <Button
                variant="filled"
                onClick={() => {
                  closeDrawer();
                  router.push("/sign-in");
                }}
              >
                เข้าสู่ระบบ
              </Button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Index;
