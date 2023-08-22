import { modals } from '@mantine/modals';
import { Text } from '@mantine/core';

export const ErrorModal = ({
  title,
  content,
}: {
  title: string;
  content?: string;
}) =>
  modals.openConfirmModal({
    title: title,
    centered: true,
    children: (
      <Text size='sm'>
        {content || `Comment wasn't created successfully. Please try again.`}
      </Text>
    ),
    labels: { confirm: 'Ok', cancel: 'cancel' },
    cancelProps: { display: 'none' },
  });
