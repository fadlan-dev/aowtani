'use client';
import { cn } from '@/libs/utils';
import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent, useState , useEffect} from 'react';

interface BasciSearchProps {
  className?: string;
  title?: string;
  subTitle?: string;
  placeholder: string;
  tag?: string;
}

const BasciSearch: FunctionComponent<BasciSearchProps> = ({
  className,
  placeholder,
  tag,
}) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [keyword,setKeyword] = useState('')

  const handleRoute = ({
    search = '',
    page = '1',
  }: {
    search?: string;
    page?: string;
  }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('search', `${search}`);
    router.push(`${pathname}?${newParams}`);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    if(value === ''){
      handleRoute({ search: value});
    }
    setKeyword(value)

  }

  return (
    <div className={cn(className, 'text-center')}>
      <TextInput
        defaultValue={String(searchParams.get('search') || '')}
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
            onClick={(e)=>{
              handleRoute({ search: keyword});
            }}
          >
            <IconSearch size='1.1rem' stroke={1.5} />
          </ActionIcon>
        }
        placeholder={placeholder}
        rightSectionWidth={42}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleRoute({ search: keyword});
          }
        }}
        onChange={handleChange}
      />
      {tag && <p className='mt-4'>#{tag}</p>}
    </div>
  );
};

export default BasciSearch;
