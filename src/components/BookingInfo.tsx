'use client';
import { Card, Divider, Title, Text, Group } from '@mantine/core';
import { FunctionComponent, useCallback } from 'react';
import PaymentMethod from './PaymentMethod';
import { numberFormat } from '@/libs/utils';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { IPackage } from '@/types';

interface BookingInfoProps {
  pkg: IPackage;
}

const BookingInfo: FunctionComponent<BookingInfoProps> = ({ pkg }) => {
  const searchParams = useSearchParams();
  const tour_date = searchParams.get('tour_date');
  const quantity = Number(searchParams.get('quantity'));

  const total = useCallback(() => pkg.price * quantity, [pkg, quantity]);
  return (
    <Card>
      <Title order={3}>ข้อมูลการจอง</Title>
      <div className='mt-6'>
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='text-start'>ยอดชำระทั้งหมด</th>
              <th className='text-end whitespace-nowrap'>ราคาต่อท่าน</th>
              <th className='text-end'>จำนวน</th>
              <th className='text-end whitespace-nowrap'>รวม (บาท)</th>
            </tr>
          </thead>
          <tbody className='mt-4'>
            <tr>
              <td>
                <Group spacing={2}>
                  <Title order={5}>ล่องเรือบ้านบูดี</Title>
                  <Text c='dimmed'>
                    (วันที่เดินทาง {dayjs(tour_date).format('DD/MM-YYYY')})
                  </Text>{' '}
                </Group>
              </td>
              <td className='text-end'>{numberFormat(pkg.price)}</td>
              <td className='text-end'>{numberFormat(quantity)}</td>
              <td className='text-end'>{numberFormat(total())}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Divider variant='dashed' my='md' />
      <Title order={3} className='text-end'>
        รวมเป็นเงินทั้งหมด
        <span className='text-primary mx-2'>{numberFormat(total())}</span>บาท
      </Title>

      <PaymentMethod
        className='mt-4'
        business_partner_id={pkg.tour_activity.id}
      />
    </Card>
  );
};

export default BookingInfo;
