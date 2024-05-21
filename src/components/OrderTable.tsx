import { cn, numberFormat } from "@/libs/utils";
import {
  Center,
  Group,
  UnstyledButton,
  Text,
  Table,
  ScrollArea,
  Loader,
  Card,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { FunctionComponent, useCallback, useState } from "react";
import StatusItem from "./StatusItem";
import sortBy from "lodash/sortBy";
import { useGetOrdes } from "@/hooks/useGetOrders";
import { useSession } from "next-auth/react";
import Empty from "./Empty";
import { IOrder, IOrderItem } from "@/types";

interface OrderTableProps {
  className?: string;
}

type ISortStatus = {
  columnAccessor: string;
  direction: "asc" | "desc";
};

const OrderTable: FunctionComponent<OrderTableProps> = ({ className }) => {
  const { data: session } = useSession();

  const {
    data: orders,
    isFetching,
    isFetched,
  } = useGetOrdes(session?.user.token, {});
  const [sortStatus, setSortStatus] = useState<ISortStatus>({
    columnAccessor: "",
    direction: "asc",
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
      ? sortStatus.direction === "desc"
        ? IconChevronUp
        : IconChevronDown
      : IconSelector;

    return (
      <th>
        <UnstyledButton
          onClick={() => {
            setSortStatus({
              direction: sortStatus.direction === "asc" ? "desc" : "asc",
              columnAccessor: columnAccessor,
            });
          }}
        >
          <Group position="apart" noWrap>
            <Text fz="sm" fw="bold" color="#495057" truncate>
              {children}
            </Text>
            <Center>
              <Icon size="0.9rem" stroke={1.5} />
            </Center>
          </Group>
        </UnstyledButton>
      </th>
    );
  }

  const onSorted = useCallback(() => {
    const data = sortBy(orders, sortStatus.columnAccessor) as IOrder[];
    return sortStatus.direction === "desc" ? data.reverse() : data;
  }, [sortStatus, orders]);

  const ths = (
    <tr className="text-black">
      <th className="whitespace-nowrap min-w-[112px]">ชื่อสินค้า</th>
      {/* <th className="whitespace-nowrap">SKU</th> */}
      <th className="whitespace-nowrap text-end">จำนวน</th>
      <th className="whitespace-nowrap text-end">ราคา (ต่อชิ้น)</th>
      <th className="whitespace-nowrap text-end">ชำระเงิน</th>
    </tr>
  );

  const rows = (order_items: IOrderItem[]) => {
    console.log(order_items);
    return order_items.map((order) => (
      <tr key={order.id}>
        {/* <td className="min-w-[240px]">{order.product.name}</td>
        <td className="whitespace-nowrap">{order.product.sku}</td> */}
        <td className="min-w-[240px]">{order.name}</td>
        {/* <td className="whitespace-nowrap">{order.product.sku}</td> */}
        <td className="text-end">{numberFormat(order.quantity)}</td>
        <td className="text-end">{numberFormat(order.price)}</td>
        <td className="text-end">
          {numberFormat(order.price * order.quantity)}
        </td>
      </tr>
    ));
  };

  if (isFetching && !isFetched) {
    return (
      <center>
        <Loader />
      </center>
    );
  }

  return (
    <>
      {orders?.map((order) => (
        <>
          <Card shadow="sm" withBorder mb={15}>
            <Card.Section className="flex justify-between px-6 gap-3">
              <Text fw={500} size="lg" mt="md">
                {dayjs(order.order_at).format("YYYY-MM-DD")}
              </Text>
              <Text fw={500} size="lg" mt="md" className="flex items-center">
                <StatusItem text={order.status} />
                &nbsp;
                <Text size="xs"> { /* order.tracking_code &&  */"เลขติดตามพัสดุ"} </Text>
                &nbsp;
                <Text fw={500}>{order.tracking_code ? order.tracking_code : "-"}</Text>
              </Text>
            </Card.Section>
            <ScrollArea>
              <Table verticalSpacing="md" striped className={cn(className)}>
                <thead>{ths}</thead>
                {orders?.length !== 0 && (
                  <tbody>{rows(order.order_items)}</tbody>
                )}
              </Table>
            </ScrollArea>
          </Card>
        </>
      ))}

      {orders?.length === 0 && <Empty className="mt-4" />}
    </>
  );
};

export default OrderTable;
