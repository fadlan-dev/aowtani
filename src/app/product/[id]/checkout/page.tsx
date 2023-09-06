'use client';
import PaymentMethod from '@/components/PaymentMethod';
import OrderForm from '@/components/forms/OrderForm';
import { useGetProduct } from '@/hooks/useGetProduct';
import { numberFormat } from '@/libs/utils';
import { IProduct } from '@/types';
import { Card, Divider, Flex, Loader, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface pageProps {
  params: { id: string };
}

const Page = ({ params }: pageProps) => {
  const searchParams = useSearchParams();
  const quantity = searchParams.get('quantity');

  const {
    data: product,
    isFetching,
    isFetched,
  } = useGetProduct({ id: params.id });

  const callTotalProce = useCallback(
    (product: IProduct) => {
      return Number(product.price * Number(quantity)).toLocaleString();
    },
    [quantity]
  );

  return (
    <div className='mt-20 mb-20'>
      <center>
        <h1>ยืนยันการชำระเงิน</h1>
        <p>โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดชำระเงิน</p>
      </center>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-4 mt-4'>
          <div className='flex-1 '>
            {isFetching && !isFetched ? (
              <center>
                <Loader />
              </center>
            ) : (
              <Card>
                <Title order={3}>ข้อมูลการสั่งซื้อ</Title>
                <div className='mt-6'>
                  <table className='table-auto w-full'>
                    <thead>
                      <tr>
                        <th className='text-start'>ยอดชำระทั้งหมด</th>
                        <th className='text-end whitespace-nowrap'>
                          ราคาต่อท่าน
                        </th>
                        <th className='text-end'>จำนวน</th>
                        <th className='text-end whitespace-nowrap'>
                          รวม (บาท)
                        </th>
                      </tr>
                    </thead>
                    <tbody className='mt-4'>
                      <tr>
                        <td>
                          <Flex align='center' gap='sm' wrap='wrap'>
                            <Image
                              src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1699&q=80'
                              className='object-cover'
                              width={84}
                              height={84}
                              alt={`${product?.name}`}
                            />
                            <Link
                              href={`product/${params.id}`}
                              className='text-black'
                            >
                              <Title order={5}>ล่องเรือบ้านบูดี</Title>
                            </Link>
                          </Flex>
                        </td>
                        <td className='text-end'>
                          {product && numberFormat(product.price)}
                        </td>
                        <td className='text-end'>
                          {numberFormat(Number(quantity))}
                        </td>
                        <td className='text-end'>
                          {product && callTotalProce(product)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Divider variant='dashed' my='md' />
                <Title order={3} className='text-end'>
                  รวมเป็นเงินทั้งหมด
                  <span className='text-primary mx-2'>
                    {product && callTotalProce(product)}
                  </span>
                  บาท
                </Title>
                {product?.shop && (
                  <PaymentMethod
                    className='mt-4'
                    business_partner_id={product.shop.id}
                  />
                )}
              </Card>
            )}
          </div>
          <div className='w-full lg:w-80'>
            {product && <OrderForm product={product} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
