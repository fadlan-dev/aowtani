'use client';
import { FunctionComponent } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import {
  Select,
  TextInput,
  NumberInput,
  Paper,
  Text,
  Button,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { z } from 'zod';
import { useSession } from 'next-auth/react';

interface BookingProps {
  price: number;
}

const schema = z.object({
  date: z.date(),
  prefix: z.string().min(1, { message: 'Please select your Prefix' }),
  fname: z.string().min(1, { message: 'Please select your Firstname' }),
  sname: z.string().min(1, { message: 'Please select your Surname' }),
  email: z.string().email({ message: 'Invalid email' }),
  tel: z.string().min(10, { message: 'Tel should have at least 10 letters' }),
  note: z.string(),
  people: z
    .number()
    .min(1, { message: 'You must be at least 1 to create an account' }),
});

const Booking: FunctionComponent<BookingProps> = ({ price }) => {
  const { data: session } = useSession();
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      date: '',
      prefix: 'Mr',
      fname: '',
      sname: '',
      email: '',
      tel: '',
      note: '',
      people: '',
    },
  });
  return (
    <Paper p='md'>
      <form
        className='flex flex-col gap-2'
        onSubmit={form.onSubmit((e) => {
          console.log('onSubmit', e);
        })}
      >
        <DateInput
          label='วันที่เดินทาง'
          placeholder='เลือกวันที่เดินทาง'
          {...form.getInputProps('date')}
        />
        <Select
          label='คำนำหน้า'
          placeholder='Pick one'
          name='prefix'
          data={[
            { value: 'Mr', label: 'นาย' },
            { value: 'Ms', label: 'นางสาว' },
          ]}
          {...form.getInputProps('prefix')}
        />
        <TextInput
          label='ชื่อ'
          placeholder='กรอกชื่อ'
          {...form.getInputProps('fname')}
        />
        <TextInput
          label='นามสกุล'
          placeholder='กรอกนามสกุล'
          {...form.getInputProps('sname')}
        />
        <TextInput
          label='อีเมล'
          placeholder='กรอกอีเมล์'
          {...form.getInputProps('email')}
        />
        <TextInput
          label='เบอร์โทรศัพท์'
          placeholder='กรอกเบอร์โทรศัพท์'
          {...form.getInputProps('tel')}
        />
        <TextInput
          label='หมายเหตุ'
          placeholder='กรอกหมายเหตุที่ต้องการ'
          {...form.getInputProps('note')}
        />
        <NumberInput
          label='จำนวน'
          min={1}
          placeholder='ระบุจำนวน'
          {...form.getInputProps('people')}
        />
        <Text className='mt-4 font-semibold text-end'>
          ราคารวมทั้งหมด
          <span className='text-xl px-1 text-primary'>
            {Number(price).toLocaleString()}
          </span>{' '}
          บาท
        </Text>
        {session ? (
          <Button variant='gradient' type='submit'>
            จองทัวร์
          </Button>
        ) : (
          <Button variant='gradient'>เข้าสู่ระบบเพื่อจอง</Button>
        )}
      </form>
    </Paper>
  );
};

export default Booking;
