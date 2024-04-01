"use client";
import {
  ActionIcon,
  Box,
  Group,
  Loader,
  Navbar,
  Text,
  ThemeIcon,
  Pagination
} from "@mantine/core";
import DestinationList from "./DestinationList";
import { CalendarIcon, FoodIcon, LinkOutIcon, MarketIcon, MosqueIcon, MuseumIcon, ResortIcon, SouvenirIcon, TravelIcon } from "./Icons";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/libs/utils";
import { IDestination, IPackage, IPartner, IProduct } from "@/types";
import ProductList from "./ProductList";
import PackageList from "./PackageList";
import ExploreButton from "./ExploreButton";
import { useCallback, useState, useEffect } from "react";
import { getDestinations } from "@/libs/services/getDestinations";
import { getPackages } from "@/libs/services/getPackages";
import { getProducts } from "@/libs/services/getProducts";
import { getPartners } from "@/libs/services/getPartners";
import { useQuery } from "@tanstack/react-query";
import HotelList from "./HotelList";
import RestaurantList from "./RestaurantList";
import PartnerList from "./PartnerList";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Banner from "./Banner";
import RestaurantFilter from "./RestaurantFilter";
import { data } from "autoprefixer";

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

const Index = ({ }: Props) => {
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
      case "transport":
        return <TransportItem />;
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
        per_page: 4,
        search: "",
      }),
  });

  const { data: pkgs, isLoading: loadingPackage } = useQuery({
    queryKey: ["packages"],
    queryFn: () =>
      getPackages({
        per_page: 4,
        search: "",
      }),
  });

  const { data: products, isLoading: loadingProduct } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      getProducts({
        per_page: 4,
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
        <ExploreButton className="mt-2" to="package" />
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
  const [hotels, setHotels] = useState<IPartner[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [valuePages, setvaluePages] = useState(1);

  const { data: hotel, isLoading } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => getPartners({ type: "Hotel", page: 1, per_page: 6, search: "" }),
  });

  useEffect(() => {
    if (hotel) {
      setHotels(hotel.data);
      setTotalPages(hotel.total);
    }
  }, [hotel]);

  const fetchHotels = async (page: number) => {
    try {
      const response = await getPartners({ type: "Hotel", page, per_page: 6, search: "" });
      setHotels(response.data);
      setTotalPages(response.total);
      setvaluePages(page)
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const parentHandleChange = (page: number) => {
    fetchHotels(page);
  };

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
          data={(hotels || []) as IPartner[]}
          total={Number(totalPages)}
          handleChange={parentHandleChange}
          showMore
          value={valuePages}
        />
      )}
    </>
  );
};

const RestaurantItem = () => {

  const [restaurants, setRestaurants] = useState<IPartner[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [valuePages, setvaluePages] = useState(1);
  const [filterValue, setFilterValue] = useState('ทั้งหมด')

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => getPartners({ type: "Restaurant", page: 1, per_page: 6, search: "" }),
  });

  useEffect(() => {
    if (restaurant) {
      setRestaurants(restaurant.data);
      setTotalPages(restaurant.total);
    }
  }, [restaurant]);

  const fetchHotels = async (page: number, per:number, filter?:string) => {
    try {
      const response = await getPartners({ type: "Restaurant", page, per_page: per, search: "" });
      
      if(per === 100){
        setRestaurants(response.data.filter(item => filter === 'ทั้งหมด' ? item : item.type_details === filter));
        setTotalPages(1);
      }else{
        setRestaurants(response.data);
        setTotalPages(response.total);
      }
      
      setvaluePages(page)
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const parentHandleChange = (page: number) => {
    fetchHotels(page, 6);
  };

  const filterRestaurant = (value: string) => {
    setFilterValue(value);
    if(value !== "ทั้งหมด"){
      fetchHotels(1, 100, value);
    }else {
      fetchHotels(1, 6);
    }

  }
  console.log(filterValue)
  return (
    <>
      <center>
        <h1>อาหารจานโปรด</h1>
        <p>อร่อยทุกเมนู</p>
      </center>
      <div className="flex justify-end pr-3 mb-5">
        <RestaurantFilter value={filterValue} setValue={filterRestaurant} />
      </div>
      {isLoading ? (
        <LoaderItem />
      ) : (
        <RestaurantList
          data={(restaurants || []) as IPartner[]}
          total={Number(totalPages)}
          handleChange={parentHandleChange}
          showMore
          value={valuePages}
        />
      )}
    </>
  );
};

const MosqueItem = () => {
  const [mosques, setMosques] = useState<IDestination[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const { data: mosque, isLoading } = useQuery({
    queryKey: ["mosques"],
    queryFn: () =>
      getDestinations({
        destination_type_id: "12",
        page: 1,
        per_page: 6,
        search: "",
      }),
  });

  useEffect(() => {
    if (mosque) {
      setMosques(mosque.data);
      setTotalPages(mosque.total);
    }
  }, [mosque]);

  const handleChange = async (page: number) => {
    const response = await getDestinations({
      destination_type_id: "12",
      page: Number(page) || 1,
      per_page: 6,
      search: "",
    })
    setMosques(response.data);
    setTotalPages(response.total);
  };
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
          total={totalPages}
          data={(mosques || []) as IDestination[]}
          className="mt-6 mb-6"
          showMoreType="12"
          showPagination
          handleChange={handleChange}
        />
      )}
    </>
  );
};

const MuseumItem = () => {
  const [museums, setMuseums] = useState<IDestination[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const { data: museum, isLoading } = useQuery({
    queryKey: ["museums"],
    queryFn: () =>
      getDestinations({
        destination_type_id: "10",
        page: 1,
        per_page: 6,
        search: "",
      }),
  });

  useEffect(() => {
    if (museum) {
      setMuseums(museum.data);
      setTotalPages(museum.total);
    }
  }, [museum]);

  const handleChange = async (page: number) => {
    const response = await getDestinations({
      destination_type_id: "10",
      page: Number(page) || 1,
      per_page: 6,
      search: "",
    })
    setMuseums(response.data);
    setTotalPages(response.total);
  };

  return (
    <>
      <center>
        <h1>พิพิธภัณฑ์</h1>
        <p>แหล่งเรียนรู้มิวเซียม</p>
      </center>
      {isLoading ? (
        <LoaderItem />
      ) : (
        <DestinationList
        total={totalPages}
        data={(museums || []) as IDestination[]}
        className="mt-6 mb-6"
        showMoreType="10"
        showPagination
        handleChange={handleChange}
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
        per_page: 9,
        search: "",
      }),
  });

  return (
    <>
      <center>
        <h1>แหล่งชอปปิ้ง / ตลาดนัด</h1>
        <p>ร่วมแหล่งช๊อป กิน ชิล</p>
      </center>
      {isLoading ? (
        <LoaderItem />
      ) : (
        <DestinationList
          total={1}
          data={(markets?.data || []) as IDestination[]}
          className="mt-6 mb-6"
          showMoreType="12"
          showPagination

        />
      )}
    </>
  );
};

const TransportItem = () => {
  const [transports, setTransports] = useState<IPartner[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [valuePages, setvaluePages] = useState(1);

  const { data: transport, isLoading } = useQuery({
    queryKey: ["others"],
    queryFn: () => getPartners({ type: "Other", page: 1, per_page: 6, search: "" }),
  });

  useEffect(() => {
    if (transport) {
      setTransports(transport.data.filter(item => item.type_details === "ขนส่งสาธารณะ"));
      setTotalPages(transport.total);
    }
  }, [transport]);

  const fetchTransports = async (page: number) => {
    try {
      const response = await getPartners({ type: "Other", page, per_page: 6, search: "" });
      setTransports(response.data.filter(item => item.type_details === "ขนส่งสาธารณะ"));
      setTotalPages(response.total);
      setvaluePages(page)
    } catch (error) {
      console.error("Error fetching Transports:", error);
    }
  };

  const parentHandleChange = (page: number) => {
    fetchTransports(page);
  };

  return (
    <>
      <center>
        <h1>ขนส่งสาธารณะ</h1>
        <p>สะดวกทุกการเดินทาง</p>
      </center>
      {isLoading ? (
        <LoaderItem />
      ) : (
        <PartnerList
          data={(transports || []) as IPartner[]}
          total={Number(totalPages)}
          handleChange={parentHandleChange}
          value={valuePages}
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
