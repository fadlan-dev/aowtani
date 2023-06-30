'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils';
import {
  TextInput,
  Button,
  Group,
  Card,
  Textarea,
  FileButton,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import Image from 'next/image';

type Props = {
  className?: string;
};

const EntrepreneursForm = ({ className }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const form = useForm({
    initialValues: {
      image: '',
      name: '',
      experience: '',
      community: '',
      facebook: '',
      tel: '',
      desc: '',
    },

    validate: {
      image: isNotEmpty('Please upload your Image'),
      name: isNotEmpty('Please input your Name'),
      experience: isNotEmpty('Please input your Experience'),
      community: isNotEmpty('Please input your Community'),
      facebook: isNotEmpty('Please input your Facebook'),
      tel: isNotEmpty('Please input your Tel'),
      desc: isNotEmpty('Please input your Description'),
    },
  });

  const handleFileChange = (event: any) => {
    setFile(event);
    const file = event;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Card maw={450} mx='auto' className={cn(className)}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Group position='center'>
          <FileButton onChange={handleFileChange} accept='image/png,image/jpeg'>
            {(props) =>
              previewImage ? (
                <Image
                  {...props}
                  width={120}
                  height={120}
                  src={`${previewImage}`}
                  alt={''}
                  className='m-auto border border-dashed border-zinc-200 p-2'
                />
              ) : (
                <Button {...props}>Upload image</Button>
              )
            }
          </FileButton>
        </Group>

        <TextInput
          withAsterisk
          label='ชื่อธุรกิจ'
          placeholder='your@email.com'
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          label='ประเภทธุรกิจ'
          placeholder='your@email.com'
          {...form.getInputProps('experience')}
        />
        <TextInput
          withAsterisk
          label='ชุมชน'
          placeholder='your@email.com'
          {...form.getInputProps('community')}
        />
        <TextInput
          withAsterisk
          label='Facebook'
          placeholder='your@email.com'
          {...form.getInputProps('facebook')}
        />
        <TextInput
          withAsterisk
          label='เบอร์โทร'
          placeholder='your@email.com'
          {...form.getInputProps('tel')}
        />
        <Textarea
          withAsterisk
          label='รายละเอียด'
          placeholder='your@email.com'
          {...form.getInputProps('desc')}
        />

        <Group position='right' mt='md'>
          <Button type='submit'>ยืนยัน</Button>
        </Group>
      </form>
    </Card>
  );
};

export default EntrepreneursForm;
