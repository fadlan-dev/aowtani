import { Badge } from '@mantine/core';
import { FunctionComponent } from 'react';

interface StatusItemProps {
  text: string;
}

interface IStatus {
  pending: string;
  confirm: string;
  cancel: string;
}

const StatusItem: FunctionComponent<StatusItemProps> = ({ text }) => {
  const STATUS = {
    pending: 'blue',
    confirm: 'green',
    cancel: 'red',
  };
  return <Badge color={STATUS[text as keyof IStatus] || 'gray'}>{text}</Badge>;
};

export default StatusItem;
