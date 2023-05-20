'use client';
import {
  ActionIcon,
  SegmentedControl,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Props = {
  className?: string;
};

const FoodSearch = ({ className }: Props) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  const onSearch = () => {
    search && console.log(search);
  };
  return (
    <div className={className}>
      <TextInput
        className=' max-w-md m-auto'
        icon={<IconSearch size='1.1rem' stroke={1.5} />}
        radius='xl'
        size='md'
        rightSection={
          <ActionIcon
            size={32}
            radius='xl'
            color={theme.primaryColor}
            variant='filled'
            onClick={onSearch}
          >
            <IconSearch size='1.1rem' stroke={1.5} />
          </ActionIcon>
        }
        placeholder='ค้นหาอาหารที่ชอบ'
        rightSectionWidth={42}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
      />
      <div className='text-end mt-4'>
        <SegmentedControl
          value={searchParams.get('tab') || 'type'}
          data={[
            { label: 'ประเภทอาหาร', value: 'type' },
            { label: 'สถานที่', value: 'location' },
            { label: 'ระดับดาว', value: 'rating' },
          ]}
          onChange={(e) => router.push(`/food?tab=${e}`)}
        />
      </div>
    </div>
  );
};

export default FoodSearch;
