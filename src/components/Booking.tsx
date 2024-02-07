'use client';
import { FunctionComponent } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput, Paper, Text, Button } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import Link from 'next/link';

interface BookingProps {
  id: number | string;
  price: number;
}

const schema = z.object({
  tour_date: z.date(),
  note: z.string(),
  quantity: z
    .number()
    .min(1, { message: 'You must be at least 1 to create an account' }),
});

const Booking: FunctionComponent<BookingProps> = ({ id,price }) => {

  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();

  const form = useForm({
    initialValues: {
      tour_date: '',
      note: '',
      quantity: 1,
    },
    validate: zodResolver(schema),
  });

  return (
    <Paper p='md'>
      <form
        className='flex flex-col gap-2'
        onSubmit={form.onSubmit((_values) => {
          const url = `/booking/${params.id}/?tour_date=${dayjs(
            new Date(form.values.tour_date)
          ).format('YYYY-MM-DD')}&note=${form.values.note}&quantity=${
            form.values.quantity
          }`;
          router.push(url);
        })}
      >
        <DateInput
          label='วันที่เดินทาง'
          placeholder='เลือกวันที่เดินทาง'
          valueFormat='YYYY MMM DD'
          minDate={dayjs(new Date()).add(1, 'day').toDate()}
          {...form.getInputProps('tour_date')}
        />
        <NumberInput
          label='จำนวน'
          min={1}
          placeholder='ระบุจำนวน'
          {...form.getInputProps('quantity')}
        />
        <Text className='mt-4 font-semibold text-end'>
          ราคารวมทั้งหมด
          <span className='text-xl px-1 text-primary'>
            {Number(price).toLocaleString()}
          </span>
          บาท
        </Text>
        {session ? (
          <Button variant='gradient' type='submit'>
            จองทัวร์
          </Button>
        ) : (
          <Link href={`/sign-in?callback=/package/${id}`}>
            <Button variant='gradient' fullWidth>เข้าสู่ระบบเพื่อจอง</Button>
          </Link>
        )}
      </form>
    </Paper>
  );
};

export default Booking;
