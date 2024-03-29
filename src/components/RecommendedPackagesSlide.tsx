'use client';
import { Carousel } from '@mantine/carousel';
import { Loader, Text, useMantineTheme } from '@mantine/core';
import { IOrganization, IPackage } from '@/types';
import { useGetPackages } from '@/hooks/useGetPackage';
import PackageItem from './PackageItem';
import Empty from './Empty';

type Props = {
  organization: IOrganization;
};

const Index = ({ organization }: Props) => {
  const theme = useMantineTheme();
  const {
    data: pkgs,
    isLoading,
    isFetched,
    isError,
    error,
  } = useGetPackages(organization.id);

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className='pb-6'>
      <Text size='lg' weight='bold' mt={8}>
        แพ็กเกจทัวร์แนะนำ
      </Text>
      {isLoading && !isFetched ? (
        <center>
          <Loader />
        </center>
      ) : pkgs?.data.length === 0 ? (
        <center>
          <Empty className='py-4' />
        </center>
      ) : (
        <Carousel
          mx='auto'
          className='mt-2'
          withIndicators
          dragFree
          slideGap='md'
          align='start'
          styles={{
            indicator: {
              width: 10,
              position: 'relative',
              bottom: -28,
              '&[data-active]': {
                backgroundColor: theme.colors.brand[6],
              },
            },
          }}
        >
          {pkgs?.data.map((pkg: IPackage, idx: number) => (
            <Carousel.Slide key={idx}>
              <PackageItem data={pkg} />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Index;
