"use client";

import PaymentMethod from "@/components/PaymentMethod";
import OrderForm from "@/components/forms/OrderForm";
import { useGetProduct } from "@/hooks/useGetProduct";
import { numberFormat } from "@/libs/utils";
import { IProduct } from "@/types";
import { Card, Divider, Flex, Loader, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { useCart } from "react-use-cart";

interface pageProps {
  params: { id: string };
}

const Page = ({ params }: pageProps) => {
  const {
    items,
    isEmpty,
    updateItemQuantity,
    cartTotal,
    totalItems,
    totalUniqueItems,
    metadata,
  } = useCart();

  return (
    <div className="mt-20 mb-20">
      <center>
        <h1>ยืนยันการชำระเงิน</h1>
        <p>โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดชำระเงิน</p>
      </center>
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-4 mt-4">
          <div className="flex-1">
            <Card>
              <Title order={3}>ข้อมูลการสั่งซื้อ</Title>
              <div className="mt-6">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="text-start">ยอดชำระทั้งหมด</th>
                      <th className="text-end whitespace-nowrap">
                        ราคาต่อท่าน
                      </th>
                      <th className="text-end">จำนวน</th>
                      <th className="text-end whitespace-nowrap">รวม (บาท)</th>
                    </tr>
                  </thead>
                  <tbody className="mt-4 space-y-3">
                    {items?.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <Flex align="center" gap="sm" wrap="wrap">
                            <Image
                              src={`${process.env.NEXT_IMAGE_HOST}${product?.image?.asset}`}
                              className="object-cover"
                              width={84}
                              height={84}
                              alt={`${product?.name}`}
                            />
                            <Link
                              href={`product/${params.id}`}
                              className="text-black"
                            >
                              <Title order={5}>{product?.name}</Title>
                            </Link>
                          </Flex>
                        </td>
                        <td className="text-end">
                          {product && numberFormat(product.price)}
                        </td>
                        <td className="text-end">
                          {numberFormat(Number(product.quantity))}
                        </td>
                        <td className="text-end">
                          {numberFormat(Number(product.itemTotal))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Divider variant="dashed" my="md" />
              <Title order={3} className="text-end">
                รวมเป็นเงินทั้งหมด
                <span className="text-primary mx-2">
                  {numberFormat(cartTotal)}
                </span>
                บาท
              </Title>
              {metadata?.shop && (
                <PaymentMethod
                  className="mt-4"
                  business_partner_id={metadata.shop.id}
                />
              )}
            </Card>
          </div>
          <div className="w-full lg:w-80">
            {items && <OrderForm product={items} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
