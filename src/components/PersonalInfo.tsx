import { Button, Group, Input, Text, TextInput, Textarea } from '@mantine/core';
import { useSession } from 'next-auth/react';
import React from 'react';

type Props = {
  className?: string;
};

const PersonalInfo = ({ className }: Props) => {
  const { data: session } = useSession();
  return (
    <form className={`block max-w-xs ${className}`}>
      <TextInput
        label='ชื่อ-สกุล'
        placeholder='ชื่อ-สกุล'
        mt='md'
        value={session?.user.name || ''}
      />
      <TextInput
        label='อีเมล์'
        placeholder='อีเมล์'
        mt='md'
        value={session?.user.email || ''}
      />
      <TextInput
        label='เบอร์โทรศัพท์'
        placeholder='เบอร์โทรศัพท์'
        mt='md'
        value={session?.user.phone || ''}
      />
      <Textarea
        label='ที่อยู่'
        placeholder='ที่อยู่'
        minRows={4}
        mt='md'
        value={session?.user.address || ''}
      />
      <Button mt='md' fullWidth className='text-center'>
        บันทึกข้อมูล
      </Button>
    </form>
  );
};

export default PersonalInfo;
