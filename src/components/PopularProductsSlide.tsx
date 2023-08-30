'use client';
import { useGetProducts } from '@/hooks/useGetProducts';
import { IOrganization } from '@/types';
import { Carousel } from '@mantine/carousel';
import { Text, useMantineTheme, Loader } from '@mantine/core';
import ProductItem from './ProductItem';

type Props = {
  organization: IOrganization;
};

const Index = ({ organization }: Props) => {
  const theme = useMantineTheme();
  const {
    data: products,
    isLoading,
    isFetched,
    isError,
    error,
  } = useGetProducts({ organization_id: organization.id });

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className='pb-6'>
      <Text size='lg' weight='bold' mt={8}>
        สินค้ายอดนิยม
      </Text>
      {isLoading && !isFetched ? (
        <center>
          <Loader />
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
              position: 'relative',
              bottom: -28,
              '&[data-active]': {
                backgroundColor: theme.colors.brand[6],
              },
            },
          }}
        >
          {products?.data.map((product, idx: number) => (
            <Carousel.Slide key={idx}>
              <ProductItem product={product} />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Index;
