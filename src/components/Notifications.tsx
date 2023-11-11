import { NotificationProps, notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

interface NotiProps extends NotificationProps {
  title?: string | 'Error';
}

const success = (props: NotiProps) =>
  notifications.show({
    ...props,
    title: props.title,
    color: 'green',
    icon: <IconCheck />,
    loading: false,
  });

const error = (props: NotiProps) =>
  notifications.show({
    ...props,
    title: props.title,
    color: 'red',
    icon: <IconX />,
    loading: false,
    autoClose: false,
  });

export const Notifications = { success, error };
