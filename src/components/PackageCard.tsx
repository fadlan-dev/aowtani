import { numberFormat } from '@/libs/utils';
import {
  AspectRatio,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
} from '@mantine/core';

type Props = {};

const PackageCard = (props: Props) => {
  return (
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
        แหลมตาชี
      </Text>
      <Group>
        <Badge>Badge</Badge>
      </Group>
      <Text lineClamp={3}>
        คงจะมีไม่กี่คนที่เคยไปเที่ยว ปัตตานี หนึ่งในจังหวัดของ ภาคใต้
        วันนี้เราเลยจะพาทุกคนไปดูหนึ่งที่เที่ยวสวยๆ อันซีนของจังหวัดนี้กัน
      </Text>
      <Text weight={600} align='end'>
        {numberFormat(1900)} ฿/ท่าน
      </Text>
      <Button variant='light' fullWidth mt='md' radius='md'>
        ดูรายละเอียด
      </Button>
    </Card>
  );
};

export default PackageCard;
