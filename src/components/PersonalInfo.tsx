import {
  Avatar,
  Button,
  Group,
  Input,
  Select,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useSession } from 'next-auth/react';
import React from 'react';

type Props = {
  className?: string;
};

const PersonalInfo = ({ className }: Props) => {
  const { data: session } = useSession();
  return (
    <form className={`block max-w-full sm:max-w-xs ${className}`}>
      <Avatar
        m='auto'
        size='xl'
        radius={100}
        src={`${process.env.NEXT_PUBLIC_URL}${session?.user.profile?.asset}`}
      />
      <Select
        mt='md'
        readOnly
        label='คำนำหน้า'
        value={session?.user.name_title}
        data={[
          { value: 'mr', label: 'นาย' },
          { value: 'ms', label: 'นางสาว' },
        ]}
      />
      <TextInput
        readOnly
        label='ชื่อ'
        placeholder='ชื่อ-สกุล'
        mt='md'
        defaultValue={session?.user.first_name || ''}
      />
      <TextInput
        readOnly
        label='สกุล'
        placeholder='สกุล'
        mt='md'
        defaultValue={session?.user.last_name || ''}
      />
      <TextInput
        readOnly
        label='อีเมล์'
        placeholder='อีเมล์'
        mt='md'
        defaultValue={session?.user.username || ''}
      />
      <TextInput
        readOnly
        label='เบอร์โทรศัพท์'
        placeholder='เบอร์โทรศัพท์'
        mt='md'
        defaultValue={session?.user.phone || ''}
      />
      <Textarea
        readOnly
        label='ที่อยู่'
        placeholder='ที่อยู่'
        minRows={4}
        mt='md'
        defaultValue={session?.user.address || ''}
      />
      <TextInput
        readOnly
        label='รหัสไปรษณีย์'
        placeholder='รหัสไปรษณีย์'
        mt='md'
        defaultValue={session?.user.post_code || ''}
      />
      <Button mt='md' fullWidth className='text-center'>
        บันทึกข้อมูล
      </Button>
    </form>
  );
};

export default PersonalInfo;
