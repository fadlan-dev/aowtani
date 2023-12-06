import { cn, numberFormat } from '@/libs/utils';
import {
  Group,
  Table,
  UnstyledButton,
  Text,
  Center,
  ScrollArea,
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
import { useSession } from 'next-auth/react';
import { useGetBookings } from '@/hooks/useGetBookings';
import Empty from './Empty';
import { IBooking } from '@/types';

interface PackageTableProps {
  className?: string;
}

interface IDate {
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

type ISortStatus = {
  columnAccessor: string;
  direction: 'asc' | 'desc';
};

const PackageTable: FunctionComponent<PackageTableProps> = ({ className }) => {
  const { data: session } = useSession();
  const { data: bookings } = useGetBookings(session?.user.token);
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
    const data = sortBy(bookings, sortStatus.columnAccessor) as IBooking[];
    return sortStatus.direction === 'desc' ? data.reverse() : data;
  }, [sortStatus, bookings]);

  const ths = (
    <tr>
      <Th
        sorted={sortStatus.columnAccessor === 'booking_at'}
        columnAccessor='booking_at'
      >
        วันที่จอง
      </Th>
      <th>ชื่อแพ็คเกจ</th>
      <th>ชื่อไกด์</th>
      <th>รูปแบบ</th>
      <th className='whitespace-nowrap text-end'>จำนวน (ต่อท่าน)</th>
      <th>วันที่เดินทาง</th>
      <th className='whitespace-nowrap text-end'>ชำระเงิน</th>
      <th>สถานะ</th>
    </tr>
  );

  const rows = onSorted().map((pkg) => (
    <tr key={pkg.id}>
      <td>{dayjs(pkg.created_at).format('YYYY-MM-DD')}</td>
      <td className='min-w-[240px]'>{pkg.package.name}</td>
      <td className='whitespace-nowrap'>{pkg.local_guide.name}</td>
      <td className='whitespace-nowrap'>{pkg.customer_name}</td>
      <td className='text-end'>{pkg.quantity}</td>
      <td className='truncate'>{dayjs(pkg.tour_date).format('YYYY-MM-DD')}</td>
      <td className='text-end'>{numberFormat(pkg.price)}</td>
      <td>
        <StatusItem text={pkg.status} />
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table verticalSpacing='md' striped className={cn(className)}>
        <thead>{ths}</thead>
        {bookings?.length !== 0 && <tbody>{rows}</tbody>}
      </Table>
      {bookings?.length === 0 && <Empty className='mt-4' />}
    </ScrollArea>
  );
};

export default PackageTable;
