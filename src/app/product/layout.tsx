"use client";

import { useState, useEffect } from "react";
import { CartIcon } from "@/components/Icons";
import { useCart } from "react-use-cart";
import Cart from "@/components/Cart";
import { useDisclosure } from "@mantine/hooks";

import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [TotalItem, setTotalItem] = useState(0);
  const { totalUniqueItems } = useCart();

  const [cartOpened, { open, close }] = useDisclosure(false);

  const pathname = usePathname();

  useEffect(() => {
    setTotalItem(totalUniqueItems);
  }, [totalUniqueItems]);

  if (pathname.indexOf("checkout") > -1) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Cart opened={cartOpened} close={close} />
      <div className="float-right pr-12">
        <div
          onClick={open}
          className="flex items-center gap-1 px-3 py-2 border-2 border-[#4F78E6] border-solid rounded-lg cursor-pointer relative"
        >
          {TotalItem > 0 && (
            <div className="absolute top-[-12px] right-[-12px] w-[25px] h-[25px] rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white font-bold">{TotalItem}</span>
            </div>
          )}
          <span className="text-[#4F78E6] font-bold">รถเข็น</span>
          <CartIcon size={20} />
        </div>
      </div>
      <main>{children}</main>
    </>
  );
}
