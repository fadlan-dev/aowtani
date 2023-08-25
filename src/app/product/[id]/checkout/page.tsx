'use client';
import PaymentMethod from '@/components/PaymentMethod';
import OrderForm from '@/components/forms/OrderForm';
import { numberFormat } from '@/libs/utils';
import { Card, Divider, Flex, Loader, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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
    isFetching,
    data: product,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}.json`
      );
      return data;
    },
    queryKey: ['reviews-query'],
  });

  const callTotalProce = useCallback(() => {
    return Number(product.price * Number(quantity)).toLocaleString();
  }, [product, quantity]);

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
                              alt={product.name}
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
                          {numberFormat(product.price)}
                        </td>
                        <td className='text-end'>
                          {numberFormat(Number(quantity))}
                        </td>
                        <td className='text-end'>{callTotalProce()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Divider variant='dashed' my='md' />
                <Title order={3} className='text-end'>
                  รวมเป็นเงินทั้งหมด
                  <span className='text-primary mx-2'>{callTotalProce()}</span>
                  บาท
                </Title>
                <PaymentMethod className='mt-4' />
              </Card>
            )}
          </div>
          <div className='w-full lg:w-80'>
            <OrderForm product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
