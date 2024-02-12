"use client";
import {
  ActionIcon,
  Box,
  Group,
  Loader,
  Navbar,
  Text,
  ThemeIcon,
} from "@mantine/core";
import DestinationList from "./DestinationList";
import { CalendarIcon, FoodIcon, LinkOutIcon, MarketIcon, MosqueIcon, MuseumIcon, ResortIcon, SouvenirIcon, TravelIcon } from "./Icons";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/libs/utils";
import { IDestination, IPackage, IPartner, IProduct } from "@/types";
import ProductList from "./ProductList";
import PackageList from "./PackageList";
import ExploreButton from "./ExploreButton";
import { useCallback, useState } from "react";
import { getDestinations } from "@/libs/services/getDestinations";
import { getPackages } from "@/libs/services/getPackages";
import { getProducts } from "@/libs/services/getProducts";
import { getPartners } from "@/libs/services/getPartners";
import { useQuery } from "@tanstack/react-query";
import HotelList from "./HotelList";
import RestaurantList from "./RestaurantList";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Banner from "./Banner";
import RestaurantFilter from "./RestaurantFilter";

type Props = {};
export const APP_SHELL_MENUS = [
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
    slug: "?t=souvenir",
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
];

const Index = ({}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const variant = searchParams.get("t") || "destination";

  const [collapsed, { toggle: toggleCollapsed, close: closeCollapsed }] =
    useDisclosure(false);

  const contentRender = useCallback(() => {
    switch (variant) {
      case "destination":
        return <DestinationItem />;
      case "hotel":
        return <HotelItem />;
      case "restaurant":
        return <RestaurantItem />;
      case "mosque":
        return <MosqueItem />;
      case "museum":
        return <MuseumItem />;
      case "market":
        return <MarketItem />;
      case "souvenir":
        return <SouvenirItem />;
    }
  }, [variant]);

  return <>{contentRender()}</>;
};

export default Index;

const LoaderItem = () => (
  <center className="my-6">
    <Loader variant="dots" />
  </center>
);

const DestinationItem = () => {
  const { data: destinations, isLoading: loadingDestination } = useQuery({
    queryKey: ["destination"],
    queryFn: () =>
      getDestinations({
        per_page: 3,
        search: "",
      }),
  });

  const { data: pkgs, isLoading: loadingPackage } = useQuery({
    queryKey: ["packages"],
    queryFn: () =>
      getPackages({
        per_page: 3,
        search: "",
      }),
  });

  const { data: products, isLoading: loadingProduct } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      getProducts({
        per_page: 3,
        search: "",
      }),
  });

  return (
    <>
      <div className="px-4 pb-6">
        <Banner />
      </div>

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
          className="mt-6 mb-6"
          showMore
        />
      )}
      <div className="mt-10">
        <center>
          <h1>แพ็กเกจทัวร์แนะนำ</h1>
          <p>ตอบโจทย์ทุกไลฟ์สไตล์</p>
        </center>
        {loadingPackage ? (
          <LoaderItem />
        ) : (
          <PackageList
            className="mt-4 px-4"
            data={pkgs?.data || ([] as IPackage[])}
          />
        )}
      </div>
      <div className="mt-10">
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
          <ExploreButton className="mt-2" to="product" />
        )}
      </div>
    </>
  );
};

const HotelItem = () => {
  const { data: hotels, isLoading } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => getPartners({ type: "Hotel", per_page: 3, search: "" }),
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

  const [filterValue,setFilterValue] = useState('ทั้งหมด')

  const { data: restaurants, isLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => getPartners({ type: "Restaurant", per_page: 100, search: "" }),
  });
  return (
    <>
      <center>
        <h1>อาหารจานโปรด</h1>
        <p>อร่อยทุกเมนู</p>
      </center>
      <div className="float-right pr-3">
        <RestaurantFilter value={filterValue} setValue={setFilterValue}/>
      </div>
      {isLoading ? (
        <LoaderItem />
      ) : (
        <RestaurantList
          data={(restaurants?.data.filter(item=>filterValue === 'ทั้งหมด' ? item : item.type_details === filterValue) || []) as IPartner[]}
          total={Number(restaurants?.total || 0)}
          showMore
        />
      )}
    </>
  );
};

const MosqueItem = () => {
  const { data: mosques, isLoading } = useQuery({
    queryKey: ["mosques"],
    queryFn: () =>
      getDestinations({
        destination_type_id: "12",
        per_page: 3,
        search: "",
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
          className="mt-6 mb-6"
          showMoreType="12"
          showMore
        />
      )}
    </>
  );
};

const MuseumItem = () => {
  const { data: museums, isLoading } = useQuery({
    queryKey: ["museum"],
    queryFn: () =>
      getDestinations({
        destination_type_id: "10",
        per_page: 3,
        search: "",
      }),
  });
  
  return (
    <>
      <center>
        <h1>พิพิธภัณฑ์</h1>
        {/* <p>ศาสนสถาน</p> */}
      </center>
      {isLoading ? (
        <LoaderItem />
      ) : (
        <DestinationList
          total={1}
          data={(museums?.data || []) as IDestination[]}
          className="mt-6 mb-6"
          showMoreType="12"
          showMore
        />
      )}
    </>
  );
};

const MarketItem = () => {
  const { data: markets, isLoading } = useQuery({
    queryKey: ["market"],
    queryFn: () =>
      getDestinations({
        destination_type_id: "11",
        per_page: 3,
        search: "",
      }),
  });
  
  return (
    <>
      <center>
        <h1>แหล่งชอปปิ้ง / ตลาดนัด</h1>
        {/* <p>ศาสนสถาน</p> */}
      </center>
      {isLoading ? (
        <LoaderItem />
      ) : (
        <DestinationList
          total={1}
          data={(markets?.data || []) as IDestination[]}
          className="mt-6 mb-6"
          showMoreType="12"
          showMore
        />
      )}
    </>
  );
};


const SouvenirItem = () => {
  const { data: souvenirs, isLoading } = useQuery({
    queryKey: ["souvenir"],
    queryFn: () =>
      getProducts({
        per_page: 3,
        search: "",
      }),
  });
  
  return (
    <>
      <center>
        <h1>ของฝาก</h1>
        {/* <p>ศาสนสถาน</p> */}
      </center>
      {isLoading ? (
        <LoaderItem />
      ) : (
        <ProductList total={1} data={souvenirs?.data || ([] as IProduct[])} />
      )}
    </>
  );
};
