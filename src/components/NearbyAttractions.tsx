'use client';
import { cn } from '@/libs/utils';
import { AspectRatio, Card, Text, Image, Button } from '@mantine/core';

type Props = {
  className?: string;
};

const NearbyAttractions = ({ className }: Props) => {
  return (
    <div className={cn(className)}>
      <Text size='lg' weight={600}>
        สถานที่ท่องเที่ยวใกล้เคียง
      </Text>
      <ol
        className='mt-2'
        style={{
          display: 'grid',
          gap: 8,
          gridTemplateColumns: 'repeat(auto-fill,minmax(280px, 1fr))',
        }}
      >
        {new Array(3).fill('').map((dest: any) => (
          <Card
            padding='md'
            withBorder
            // onClick={() => router.push(`destination/${idx + 1}`)}
          >
            <Card.Section>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
                  alt='Norway'
                />
              </AspectRatio>
            </Card.Section>
            <Text size='lg' weight={500} mt={8}>
              แหลมตาชี
            </Text>
            <Text size='xs' className='text-primary'>
              ปน.2062 ตำบล แหลมโพธิ์ อำเภอ ยะหริ่ง ปัตตานี 94150
            </Text>
            <Text lineClamp={3}>
              คงจะมีไม่กี่คนที่เคยไปเที่ยว ปัตตานี หนึ่งในจังหวัดของ ภาคใต้
              วันนี้เราเลยจะพาทุกคนไปดูหนึ่งที่เที่ยวสวยๆ อันซีนของจังหวัดนี้กัน
            </Text>
            <Button variant='light' fullWidth mt='md' radius='md'>
              ดูรายละเอียด
            </Button>
          </Card>
        ))}
      </ol>
    </div>
  );
};

export default NearbyAttractions;
