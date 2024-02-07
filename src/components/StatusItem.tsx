import { ActionIcon, Badge } from '@mantine/core';
import { IconCircleCheck, IconCircleX, IconLoader } from '@tabler/icons-react';
import { FunctionComponent, useCallback } from 'react';

interface StatusItemProps {
  text: string;
  type?: "package" | "product"
}

interface IStatus {
  pending: string;
  approved: string;
  cancelled: string;
}

const STATUS_TH = {
  pending: 'กำลังตรวจสอบ',
  approved: 'จัดส่งแล้ว',
  cancelled: 'ยกเลิก',
};

const PACKAGE_STATUS = {
  pending: 'ยืนยันแล้ว',
  approved: 'จัดส่งแล้ว',
  cancelled: 'ยกเลิก',
}

const STATUS_COLORS = {
  pending: 'blue',
  approved: 'teal',
  cancelled: 'red',
};

const StatusItem: FunctionComponent<StatusItemProps> = ({ text,type = "order"}) => {
  const Icon = useCallback(() => {
    switch (text) {
      case 'pending':
        return (
          <ActionIcon size='xs' color={STATUS_COLORS.pending} radius='xl'>
            <IconLoader />
          </ActionIcon>
        );

      case 'approved':
        return (
          <ActionIcon size='xs' color={STATUS_COLORS.approved} radius='xl'>
            <IconCircleCheck />
          </ActionIcon>
        );

      default:
        return (
          <ActionIcon size='xs' color={STATUS_COLORS.cancelled} radius='xl'>
            <IconCircleX />
          </ActionIcon>
        );
    }
  }, [text]);
  return (
    <Badge
      pl={0}
      color={STATUS_COLORS[text as keyof IStatus] || 'gray'}
      leftSection={Icon()}
    >
      {/* {STATUS_TH[text as keyof IStatus]} */}
      {type === 'package' ? PACKAGE_STATUS[text as keyof IStatus] : STATUS_TH[text as keyof IStatus]}
    </Badge>
  );
};

export default StatusItem;
