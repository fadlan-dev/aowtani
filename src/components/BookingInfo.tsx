'use client';
import { Card, Divider, Title, Text, Group } from '@mantine/core';
import { FunctionComponent } from 'react';
import PaymentMethod from './PaymentMethod';
import { numberFormat } from '@/libs/utils';

interface BookingInfoProps {}

const BookingInfo: FunctionComponent<BookingInfoProps> = () => {
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
                  <Text c='dimmed'>(วันที่เดินทาง 25/5/2566)</Text>{' '}
                </Group>
              </td>
              <td className='text-end'>{numberFormat(1900)}</td>
              <td className='text-end'>{numberFormat(1)}</td>
              <td className='text-end'>{numberFormat(1900)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Divider variant='dashed' my='md' />
      <Title order={3} className='text-end'>
        รวมเป็นเงินทั้งหมด
        <span className='text-primary mx-2'>{numberFormat(1900)}</span>บาท
      </Title>

      <PaymentMethod className='mt-4' />
    </Card>
  );
};

export default BookingInfo;
