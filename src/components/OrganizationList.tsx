'use client';
import { IOrganization } from '@/types';
import {
  Title,
  Text,
  TextInput,
  ActionIcon,
  useMantineTheme,
  Flex,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { FunctionComponent } from 'react';
import Empty from './Empty';
import OrganizationItem from './OrganizationItem';

interface OrganizationListProps {
  data: IOrganization[];
  showSearch?: boolean;
  showPagination?: boolean;
  showMore?: boolean;
  className?: string;
  title?: string;
  subTitle?: string;
}

const OrganizationList: FunctionComponent<OrganizationListProps> = ({
  data,
  className,
  showSearch,
  showPagination,
  showMore,
  title,
  subTitle,
}) => {
  const theme = useMantineTheme();
  return (
    <div>
      <div className='text-center px-4'>
        <Title weight='bold'>{title}</Title>
        {subTitle && <Text className='mt-2'>{subTitle}</Text>}
        {showSearch && (
          <TextInput
            className='max-w-md m-auto mt-4'
            icon={<IconSearch size='1.1rem' stroke={1.5} />}
            radius='xl'
            size='md'
            rightSection={
              <ActionIcon
                size={32}
                radius='xl'
                color={theme.primaryColor}
                variant='filled'
              >
                <IconSearch size='1.1rem' stroke={1.5} />
              </ActionIcon>
            }
            placeholder='ค้นหาสถานที่ต้องการ'
            rightSectionWidth={42}
          />
        )}
      </div>
      {data.length === 0 ? (
        <Empty className='px-4 mt-10 md:mt-4' />
      ) : (
        <div className={'grid grid-cols-list gap-4 px-4 mt-4'}>
          {data.map((organize: IOrganization) => (
            <OrganizationItem key={organize.id} data={organize} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizationList;
