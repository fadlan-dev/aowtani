'use client';
import { Card, Input, Title, Textarea } from '@mantine/core';
import { FunctionComponent } from 'react';

interface CustomerInfoProps {}

const CustomerInfo: FunctionComponent<CustomerInfoProps> = () => {
  return (
    <Card>
      <Title order={4}>ข้อมูลลูกค้า</Title>
      <Input.Wrapper id='name' label='คำนำหน้า' mt='xs'>
        <Input value='นาย' />
      </Input.Wrapper>
      <Input.Wrapper id='name' label='ชื่อ' mt='xs'>
        <Input value='มัดอุสฟาน' />
      </Input.Wrapper>
      <Input.Wrapper id='name' label='นามสกุล' mt='xs'>
        <Input value='ดอลิ' />
      </Input.Wrapper>
      <Input.Wrapper id='name' label='อีเมล' mt='xs'>
        <Input value='benzusfanz@gmail.com' />
      </Input.Wrapper>
      <Input.Wrapper id='name' label='เบอร์โทรศัพท์' mt='xs'>
        <Input value='0862953078' />
      </Input.Wrapper>
      <Input.Wrapper id='name' label='หมายเหตุ' mt='xs'>
        <Textarea value='-' />
      </Input.Wrapper>
    </Card>
  );
};

export default CustomerInfo;
