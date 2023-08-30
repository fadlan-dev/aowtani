import { cn } from '@/libs/utils';
import {
  Center,
  Group,
  UnstyledButton,
  Text,
  Table,
  ScrollArea,
  Loader,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { FunctionComponent, useCallback, useState } from 'react';
import StatusItem from './StatusItem';
import sortBy from 'lodash/sortBy';
import { useGetOrdes } from '@/hooks/useGetOrders';
import { useSession } from 'next-auth/react';
import Empty from './Empty';
import { IOrder } from '@/types';

interface IData {
  id: number;
  booking_at: string;
  package: string;
  giude: string;
  type: string;
  amount: number;
  date: string;
  payment: string;
  status: string;
}

interface OrderTableProps {
  className?: string;
}

type ISortStatus = {
  columnAccessor: string;
  direction: 'asc' | 'desc';
};

const OrderTable: FunctionComponent<OrderTableProps> = ({ className }) => {
  const { data: session } = useSession();

  const {
    data: orders,
    isFetching,
    isFetched,
  } = useGetOrdes(session?.user.token, {});
  const [sortStatus, setSortStatus] = useState<ISortStatus>({
    columnAccessor: '',
    direction: 'asc',
  });

  function Th({
    children,
    sorted,
    columnAccessor,
  }: {
    children: React.ReactNode;
    columnAccessor: string;
    sorted: boolean;
  }) {
    const Icon = sorted
      ? sortStatus.direction === 'desc'
        ? IconChevronUp
        : IconChevronDown
      : IconSelector;

    return (
      <th>
        <UnstyledButton
          onClick={() => {
            setSortStatus({
              direction: sortStatus.direction === 'asc' ? 'desc' : 'asc',
              columnAccessor: columnAccessor,
            });
          }}
        >
          <Group position='apart' noWrap>
            <Text fz='sm' fw='bold' color='#495057' truncate>
              {children}
            </Text>
            <Center>
              <Icon size='0.9rem' stroke={1.5} />
            </Center>
          </Group>
        </UnstyledButton>
      </th>
    );
  }

  const onSorted = useCallback(() => {
    const data = sortBy(orders, sortStatus.columnAccessor) as IOrder[];
    return sortStatus.direction === 'desc' ? data.reverse() : data;
  }, [sortStatus, orders]);

  const ths = (
    <tr className='text-black'>
      <Th
        sorted={sortStatus.columnAccessor === 'booking_at'}
        columnAccessor='booking_at'
      >
        วันที่สั่ง
      </Th>
      <th className='whitespace-nowrap min-w-[112px]'>ชื่อสินค้า</th>
      <th className='whitespace-nowrap'>SKU</th>
      <th className='whitespace-nowrap text-end'>จำนวน (ต่อชิ้น)</th>
      <th className='whitespace-nowrap'>ที่อยู่</th>
      <th className='whitespace-nowrap'>รหัสไปรษณีย์</th>
      <th className='whitespace-nowrap text-end'>ชำระเงิน</th>
      <th className='whitespace-nowrap'>สถานะ</th>
    </tr>
  );

  const rows = onSorted().map((order) => (
    <tr key={order.id}>
      <td className='whitespace-nowrap'>
        {dayjs(order.order_at).format('YYYY-MM-DD')}
      </td>
      <td className='min-w-[240px]'>{order.product.name}</td>
      <td className='whitespace-nowrap'>{order.product.sku}</td>
      <td className='text-end'>{order.quantity}</td>
      <td>{order.price}</td>
      <td>{order.customer_address}</td>
      <td className='text-end'>{order.price * order.quantity}</td>
      <td></td>
    </tr>
  ));

  if (isFetching && !isFetched) {
    return (
      <center>
        <Loader />
      </center>
    );
  }

  return (
    <ScrollArea>
      <Table verticalSpacing='md' striped className={cn(className)}>
        <thead>{ths}</thead>

        {orders?.length !== 0 && <tbody>{rows}</tbody>}
      </Table>
      {orders?.length === 0 && <Empty className='mt-4' />}
    </ScrollArea>
  );
};

export default OrderTable;
