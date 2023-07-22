'use client';
import { Carousel } from '@mantine/carousel';
import { Text, useMantineTheme } from '@mantine/core';
import PackageCard from './PackageItem';

type Props = {};

const Index = (props: Props) => {
  const theme = useMantineTheme();
  return (
    <div className='pb-6'>
      <Text size='lg' weight={600} mt={8}>
        แพ็กเกจทัวร์แนะนำ
      </Text>
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
              backgroundColor: theme.primaryColor,
              background: theme.primaryColor,
              color: theme.primaryColor,
            },
          },
        }}
      >
        {new Array(3).fill('').map((item: any, idx: number) => (
          <Carousel.Slide key={idx}>
            {/* <PackageCard pkg={null} /> */}
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default Index;
