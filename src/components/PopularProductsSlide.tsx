'use client';
import { numberFormat } from '@/libs/utils';
import { Carousel } from '@mantine/carousel';
import {
  AspectRatio,
  Card,
  Group,
  Image,
  Text,
  Badge,
  Button,
  useMantineTheme,
} from '@mantine/core';

type Props = {};

const Index = (props: Props) => {
  const theme = useMantineTheme();
  return (
    <div className='pb-6'>
      <Text size='lg' weight={600} mt={8}>
        สินค้ายอดนิยม
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
            position: 'relative',
            bottom: -28,
            '&[data-active]': {
              backgroundColor: theme.primaryColor,
            },
          },
        }}
      >
        {new Array(3).fill('').map((item: any, idx: number) => (
          <Carousel.Slide key={idx}>
            <Card>
              <Card.Section>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
                    alt='Norway'
                  />
                </AspectRatio>
              </Card.Section>
              <Text size='lg' weight={500} mt={8}>
                กือโป๊ะบีฟีช - Befish
              </Text>
              <Group>
                <Badge>ชุมชนบ้านบูดี</Badge>
              </Group>
              <Text lineClamp={3}>
                คงจะมีไม่กี่คนที่เคยไปเที่ยว ปัตตานี หนึ่งในจังหวัดของ ภาคใต้
                วันนี้เราเลยจะพาทุกคนไปดูหนึ่งที่เที่ยวสวยๆ
                อันซีนของจังหวัดนี้กัน
              </Text>
              <Text weight={600} align='end'>
                {numberFormat(35)} ฿
              </Text>
              <Button variant='light' fullWidth mt='md' radius='md'>
                ดูรายละเอียด
              </Button>
              <Button variant='filled' fullWidth mt='md' radius='md'>
                ซื้อ
              </Button>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default Index;
