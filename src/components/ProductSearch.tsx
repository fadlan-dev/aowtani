'use client';
import {
  Title,
  Text,
  TextInput,
  ActionIcon,
  SegmentedControl,
  useMantineTheme,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent } from 'react';

interface ProductSearchProps {
  showSearch?: boolean;
}

const ProductSearch: FunctionComponent<ProductSearchProps> = ({
  showSearch,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tag = searchParams.get('t');
  const theme = useMantineTheme();
  return (
    <center className='pb-4'>
      <Title weight='bold'>ของฝาก</Title>
      <Text className='mt-2'>ช้อปปิ้งได้ทุกเวลา</Text>
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
          placeholder='ค้นหาสถานที่ชอบ'
          rightSectionWidth={42}
        />
      )}
    </center>
  );
};

export default ProductSearch;
