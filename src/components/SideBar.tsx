"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

import { cn } from "@/libs/utils";
import { ActionIcon, Group, Navbar, ThemeIcon, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";
import {
  FoodIcon,
  MosqueIcon,
  ResortIcon,
  TravelIcon,
  CalendarIcon,
  MuseumIcon,
  SouvenirIcon,
  MarketIcon,
  LinkOutIcon,
  TransportIcon
} from "./Icons";

type Props = {};

const SideBar = ({}: Props) => {
  const [collapsed, { toggle: toggleCollapsed, close: closeCollapsed }] =
    useDisclosure(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const APP_SHELL_MENUS = [
    {
      key: "event",
      title: "ปฏิทินกิจกรรม",
      icon: <CalendarIcon />,
      color: "blue",
      active: "#EDF2FF",
      slug: "/event",
    },
    {
      key: "hotel",
      title: "ที่พัก",
      icon: <ResortIcon />,
      color: "green",
      active: "#EBFBEE",
      slug: "?t=hotel",
    },
    {
      key: "restaurant",
      title: "ร้านอาหารและคาเฟ่",
      icon: <FoodIcon />,
      color: "violet",
      active: "#F3F0FF",
      slug: "?t=restaurant",
    },
    {
      key: "mosque",
      title: "มัสยิด",
      icon: <MosqueIcon />,
      color: "#E6F6F1",
      active: "#FFF4E6",
      slug: "?t=mosque",
    },
    {
      key: "museum",
      title: "พิพิธภัณฑ์",
      icon: <MuseumIcon />,
      color: "orange",
      active: "#FFF4E6",
      slug: "?t=museum",
    },
    {
      key: "souvenir",
      title: "ของฝาก",
      icon: <SouvenirIcon />,
      color: "#FFEBEB",
      active: "#FFF4E6",
      slug: "/product",
    },
    {
      key: "market",
      title: "แหล่งชอปปิ้ง / ตลาดนัด",
      icon: <MarketIcon />,
      color: "#E1E3F4",
      active: "#FFF4E6",
      slug: "?t=market",
    },
    {
      key: "transport",
      title: "ขนส่งสาธารณะ",
      icon: <TransportIcon />,
      color: "#E0FFFF",
      active: "#FFF4E6",
      slug: "?t=transport",
    },
    {
      key: "linkout1",
      title: "สมัครเป็นผู้ประกอบการ",
      icon: <LinkOutIcon />,
      color: "#ffffff",
      active: "#FFF4E6",
      slug: "https://partners.admin.aowtani.com/login",
      target: "_blank",
    },
    {
      key: "linkout2",
      title: "สมัครเป็นไกด์ท้องถิ่น",
      icon: <LinkOutIcon />,
      color: "#ffffff",
      active: "#FFF4E6",
      slug: "https://localguide.admin.aowtani.com/login",
      target: "_blank",
    },
    {
      key: "linkout3",
      title: "คู่มือการใช้งาน",
      icon: <LinkOutIcon />,
      color: "#ffffff",
      active: "#FFF4E6",
      slug: "https://drive.google.com/drive/folders/13aU9SRaktYV7FS56h7rrF0GgtO2ts6gU?usp=sharing",
      target: "_blank",
    },
    {
      key: "linkout4",
      title: "ประเมินการใช้งานระบบ",
      icon: <LinkOutIcon />,
      color: "#ffffff",
      active: "#FFF4E6",
      slug: "https://forms.gle/KCdyNTywXVjQ2Vc77",
      target: "_blank",
    },
  ];

  const activeMenu = (value: any) => {
    const t = searchParams.get("t");
    return t ? value === `?t=${t}` : value === pathname;
  };

  return (
    <div
      className={cn(
        "w-72 min-h-[calc(100vh-143px)] hidden md:block relative transition-all",
        collapsed && "w-0"
      )}
    >
      <div className="absolute top-2 -right-8">
        <ActionIcon className="hidden md:flex" onClick={toggleCollapsed}>
          {collapsed ? (
            <IconLayoutSidebarLeftExpand size="1.125rem" />
          ) : (
            <IconLayoutSidebarLeftCollapse size="1.125rem" />
          )}
        </ActionIcon>
      </div>
      <Navbar
        hiddenBreakpoint="sm"
        className={cn("w-72", collapsed && "w-0 overflow-hidden")}
      >
        {APP_SHELL_MENUS.map((menu) => (
          <Navbar.Section
            key={menu.title}
            className={cn(`p-2 cursor-pointer text-black`)}
            bg={activeMenu(menu.slug) ? menu.active : ""}
            // onClick={() =>
            //   menu.key !== variant && router.push(`?t=${menu.key}`)
            // }
          >
            <Link href={menu.slug} target={menu.target ? menu.target : "_self"}>
              <Group>
                <ThemeIcon variant="light" color={menu.color}>
                  {menu.icon}
                </ThemeIcon>
                <Text className="text-black">{menu.title}</Text>
              </Group>
            </Link>
          </Navbar.Section>
        ))}
      </Navbar>
    </div>
  );
};

export default SideBar;
