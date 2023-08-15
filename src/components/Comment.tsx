import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Menu,
  Paper,
  Rating,
  Text,
  TypographyStylesProvider,
} from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';

interface CommentProps {
  data: any;
}

const Comment: FunctionComponent<CommentProps> = ({ data }) => {
  return (
    <Paper withBorder p='sm'>
      <Flex align='center' justify='space-between'>
        <Group>
          <Avatar src={data.image} alt={data.name} radius='xl' />
          <div>
            <Group spacing={4}>
              <Text fz='sm'>{data.name}</Text>
              <Text fz='xs' c='dimmed'>
                {dayjs(data.postedAt).format('YYYY-MM-DD')}
              </Text>
            </Group>
            <Rating size='xs' value={3.5} readOnly />
          </div>
        </Group>
        <Menu shadow='md'>
          <Menu.Target>
            <ActionIcon>
              <IconDotsVertical size='1.125rem' />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconEdit size={14} />}>แก้ไข</Menu.Item>
            <Menu.Item color='red' icon={<IconTrash size={14} />}>
              ลบ
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <TypographyStylesProvider mt={8}>
        <div dangerouslySetInnerHTML={{ __html: data.body }} />
      </TypographyStylesProvider>
    </Paper>
  );
};

export default Comment;
