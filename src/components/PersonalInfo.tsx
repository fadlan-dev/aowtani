import { Button, Group, Input, Text, TextInput, Textarea } from '@mantine/core';
import React from 'react';

type Props = {
  className?: string;
};

const PersonalInfo = ({ className }: Props) => {
  return (
    <form className={`block max-w-xs ${className}`}>
      <TextInput label='ชื่อ-สกุล' placeholder='ชื่อ-สกุล' mt='md' />
      <TextInput label='อีเมล์' placeholder='อีเมล์' mt='md' />
      <TextInput label='เบอร์โทรศัพท์' placeholder='เบอร์โทรศัพท์' mt='md' />
      <Textarea label='ที่อยู่' placeholder='ที่อยู่' minRows={4} mt='md' />
      <Button mt='md' fullWidth className='text-center'>
        บันทึกข้อมูล
      </Button>
    </form>
  );
};

export default PersonalInfo;
