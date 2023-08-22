import { modals } from '@mantine/modals';
import { Text, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export const SuccessModal = ({
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
      <center>
        <ThemeIcon color='green' radius='xl' size='xl'>
          <IconCheck />
        </ThemeIcon>
        <Text size='sm'>
          {content || `Comment wasn't created successfully. Please try again.`}
        </Text>
      </center>
    ),
    confirmProps: { display: 'none' },
    cancelProps: { display: 'none' },
  });
