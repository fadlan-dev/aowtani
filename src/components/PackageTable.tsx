import { cn } from '@/libs/utils';
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

const elements: IDate[] = [
  {
    id: 1,
    booking_at: '2023-07-14 12:00:00',
    package: 'Package 1',
    giude: ' Guide Name',
    type: 'fd',
    amount: 1,
    date: '2023-07-14 12:00:00',
    payment: 'purchased',
    status: 'pending',
  },
  {
    id: 2,
    booking_at: '2023-05-01 12:00:00',
    package: 'Package 2',
    giude: ' Guide Name',
    type: 'fd',
    amount: 1,
    date: '2023-05-01 12:00:00',
    payment: 'purchased',
    status: 'confirm',
  },
  {
    id: 3,
    booking_at: '2023-05-30 12:00:00',
    package: 'Package 3',
    giude: ' Guide Name',
    type: 'fd',
    amount: 1,
    date: '2023-05-30 12:00:00',
    payment: 'purchased',
    status: 'cancel',
  },
];

type ISortStatus = {
  columnAccessor: string;
  direction: 'asc' | 'desc';
};

const PackageTable: FunctionComponent<PackageTableProps> = ({ className }) => {
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
    const data = sortBy(elements, sortStatus.columnAccessor) as IDate[];
    return sortStatus.direction === 'desc' ? data.reverse() : data;
  }, [sortStatus]);

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
      <th>จำนวน (ต่อท่าน)</th>
      <th>วันที่เดินทาง</th>
      <th>ชำระเงิน</th>
      <th>สถานะ</th>
    </tr>
  );

  const rows = onSorted().map((pkg) => (
    <tr key={pkg.id}>
      <td>{dayjs(pkg.booking_at).format('YYYY-MM-DD')}</td>
      <td>{pkg.package}</td>
      <td>{pkg.giude}</td>
      <td>{pkg.type}</td>
      <td>{pkg.amount}</td>
      <td className='truncate'>{dayjs(pkg.date).format('YYYY-MM-DD')}</td>
      <td>{pkg.payment}</td>
      <td>
        <StatusItem text={pkg.status} />
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table verticalSpacing='md' striped className={cn(className)}>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default PackageTable;
