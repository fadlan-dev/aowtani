import { cn } from '@/libs/utils';
import {
  Group,
  Table,
  UnstyledButton,
  Text,
  Center,
  ScrollArea,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { FunctionComponent, useCallback, useState } from 'react';
import StatusItem from './StatusItem';

interface PackageTableProps {
  className?: string;
}

const elements = [
  {
    id: 1,
    booking_at: '2023-01-01',
    package: 'Package Name',
    giude: ' Guide Name',
    type: 'fd',
    amount: 1,
    date: +new Date(),
    payment: 'purchased',
    status: 'pending',
  },
  {
    id: 2,
    booking_at: '2023-05-01',
    package: 'Package Name',
    giude: ' Guide Name',
    type: 'fd',
    amount: 1,
    date: +new Date(),
    payment: 'purchased',
    status: 'confirm',
  },
  {
    id: 3,
    booking_at: '2023-05-01',
    package: 'Package Name',
    giude: ' Guide Name',
    type: 'fd',
    amount: 1,
    date: +new Date(),
    payment: 'purchased',
    status: 'cancel',
  },
];

const PackageTable: FunctionComponent<PackageTableProps> = ({ className }) => {
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  function Th({
    children,
    reversed,
  }: {
    children: React.ReactNode;
    reversed: boolean;
  }) {
    const Icon = reversed ? IconChevronUp : IconChevronDown;

    return (
      <th>
        <UnstyledButton
          onClick={() => setReverseSortDirection((prev) => !prev)}
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

  const onSorted = useCallback(
    (data: any[]) => {
      return data.sort(
        (a, b) => +new Date(a.booking_at) - +new Date(b.booking_at)
      );
    },
    [reverseSortDirection]
  );

  const ths = (
    <tr>
      <Th reversed={reverseSortDirection}>วันที่จอง</Th>
      <th>ชื่อแพ็คเกจ</th>
      <th>ชื่อไกด์</th>
      <th>รูปแบบ</th>
      <th>จำนวน (ต่อท่าน)</th>
      <th>วันที่เดินทาง</th>
      <th>ชำระเงิน</th>
      <th>สถานะ</th>
    </tr>
  );

  const rows = onSorted(elements).map((pkg) => (
    <tr key={pkg.id}>
      <td>{dayjs(pkg.booking_at).format('YYYY-MM-DD')}</td>
      <td>{pkg.package}</td>
      <td>{pkg.giude}</td>
      <td>{pkg.type}</td>
      <td>{pkg.amount}</td>
      <td>{dayjs(pkg.date).format('YYYY-MM-DD')}</td>
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
