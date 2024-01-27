import { cn } from "@/libs/utils";
import { ActionIcon, Group, Navbar, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";
import { FoodIcon, MosqueIcon, ResortIcon, TravelIcon } from "./Icons";
import { Props } from "./SideBar";

const SideBar = ({}: Props) => {
  const [collapsed, { toggle: toggleCollapsed, close: closeCollapsed }] =
    useDisclosure(false);

  const APP_SHELL_MENUS = [
    {
      key: "destination",
      title: "สถานที่ท่องเที่ยว",
      icon: <TravelIcon />,
      color: "blue",
      active: "#EDF2FF",
    },
    {
      key: "hotel",
      title: "ที่พักผ่อน",
      icon: <ResortIcon />,
      color: "green",
      active: "#EBFBEE",
    },
    {
      key: "restaurant",
      title: "อาหารจานโปรด",
      icon: <FoodIcon />,
      color: "violet",
      active: "#F3F0FF",
    },
    {
      key: "mosque",
      title: "มัสยิด",
      icon: <MosqueIcon />,
      color: "orange",
      active: "#FFF4E6",
    },
  ];

  return (
    <div className="flex pt-20">
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
              className={cn(`p-2 cursor-pointer`)}
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
      </div>
    </div>
  );
};
