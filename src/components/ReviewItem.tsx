import {
  ActionIcon,
  Avatar,
  Divider,
  Flex,
  Group,
  Menu,
  Paper,
  Rating,
  Text,
  Textarea,
  TypographyStylesProvider,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { IReply, IReview } from '@/types';
import ImagesCarousel from './ImagesCarousel';
import { MODALS_CONFIG } from '@/libs/utils';

interface ReviewItemProps {
  data: IReview;
  onUpdate: (review: IReview | number) => void;
  onDelete: (id: string | number) => void;
}

const ReviewItem: FunctionComponent<ReviewItemProps> = ({
  data,
  onUpdate,
  onDelete,
}) => {
  const { data: session } = useSession();

  return (
    <>
      <Paper p='sm'>
        <Flex align='center' justify='space-between'>
          <Group spacing={8}>
            <Avatar
              src={`${process.env.NEXT_IMAGE_HOST}${data.customer?.profile.asset}`}
              alt={data.customer?.first_name}
              radius='xl'
              size='md'
            />
            <div>
              <Group spacing={4}>
                <Text fz='sm'>{data.customer?.first_name}</Text>
                <Text fz='xs' c='dimmed'>
                  {dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss')}
                </Text>
              </Group>
              <Rating size='xs' value={data.star} readOnly />
            </div>
          </Group>
          {session?.user.id === data.customer?.id && (
            <Menu
              shadow='md'
              position='bottom-end'
              withArrow
              arrowPosition='center'
            >
              <Menu.Target>
                <ActionIcon>
                  <IconDotsVertical size='1.125rem' />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconEdit size={14} />}
                  onClick={() => onUpdate(data)}
                >
                  แก้ไข
                </Menu.Item>
                <Menu.Item
                  color='red'
                  icon={<IconTrash size={14} />}
                  onClick={() => onDelete(data.id)}
                >
                  ลบ
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Flex>
        <TypographyStylesProvider mt={8}>
          <Textarea
            readOnly
            variant='unstyled'
            className=' border-none'
            value={data.text}
            autosize
          />
        </TypographyStylesProvider>
        <Flex gap={8} mt={8}>
          {(data.images || []).map((img) => (
            <div
              key={img.id}
              className='h-12 w-auto bg-zinc-200 grid place-content-center relative'
            >
              <Image
                onClick={() => {
                  modals.open({
                    ...MODALS_CONFIG,
                    children: (
                      <>
                        <ImagesCarousel images={data.images} />
                      </>
                    ),
                  });
                }}
                width={48}
                height={48}
                className='object-contain w-auto'
                src={
                  img.asset.includes('/rails/active_storage/blobs/redirect/')
                    ? `${process.env.NEXT_IMAGE_HOST}${img.asset}`
                    : `/image.svg`
                }
                alt={`${img.id}`}
              />
            </div>
          ))}
        </Flex>
        {data.reply.length !== 0 && <Divider variant='dashed' my='md' />}
        <div className='flex flex-col gap-2'>
          {data.reply.map((reply: IReply) => (
            <Paper pl={48} key={reply.id}>
              <Group spacing={8}>
                <Avatar
                  size='md'
                  alt={reply.user.username}
                  color='blue'
                  radius='xl'
                />
                <Group spacing={4}>
                  <Text fz='sm'>{reply.user.username}</Text>
                  <Text fz='xs' c='dimmed'>
                    {dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss')}
                  </Text>
                </Group>
              </Group>
              <TypographyStylesProvider mt={8}>
                <div dangerouslySetInnerHTML={{ __html: reply.text }} />
              </TypographyStylesProvider>
              <Flex gap={2} mt={8}>
                {reply.images?.map((img) => (
                  <div
                    key={img.id}
                    className='h-12 w-auto bg-zinc-200 grid place-content-center relative'
                  >
                    <Image
                      width={48}
                      height={48}
                      className='object-contain w-auto'
                      src={
                        img.asset !== 'asset url test'
                          ? `${process.env.NEXT_IMAGE_HOST}${img.asset}`
                          : '/image.svg'
                      }
                      alt={`${img.id}`}
                      onClick={() => {
                        reply.images &&
                          modals.open({
                            ...MODALS_CONFIG,
                            children: (
                              <>
                                <ImagesCarousel images={reply.images} />
                              </>
                            ),
                          });
                      }}
                    />
                  </div>
                ))}
              </Flex>
            </Paper>
          ))}
        </div>
      </Paper>
    </>
  );
};

export default ReviewItem;
