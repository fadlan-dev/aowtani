'use client';
import { cn, numberFormat } from '@/libs/utils';
import {
  AspectRatio,
  Badge,
  Button,
  Card,
  Group,
  Text,
  Image,
  Title,
} from '@mantine/core';
import { useRouter } from 'next/navigation';

type Props = {
  className?: string;
};

const PopularProducts = ({ className }: Props) => {
  const router = useRouter();
  return (
    <div className={cn(className)}>
      <div className='text-center'>
        <Title>สินค้ายอดนิยม</Title>
        <Text>ช้อปปิ้งได้ทุกเวลา</Text>
      </div>
      <div
        className={'gap-4 px-4 mt-4'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(300px, 1fr))',
        }}
      >
        {new Array(3).fill('').map((item: any, idx: number) => (
          <Card key={idx}>
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
              วันนี้เราเลยจะพาทุกคนไปดูหนึ่งที่เที่ยวสวยๆ อันซีนของจังหวัดนี้กัน
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
        ))}
      </div>
      <div className='text-center mt-4'>
        <Button variant='subtle' onClick={() => router.push('souvenir')}>
          ดูเพิ่มเติม
        </Button>
      </div>
    </div>
  );
};

export default PopularProducts;