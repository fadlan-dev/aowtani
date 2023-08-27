'use client';
import { ErrorModal } from '@/hooks/error-modal';
import {
  Box,
  Button,
  FileInput,
  Paper,
  Text,
  TextInput,
  Textarea,
  ThemeIcon,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { FunctionComponent, useEffect } from 'react';
import Image from 'next/image';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { IBookingRequest, IPackage } from '@/types';
import { useRouter } from 'next/navigation';
import { modals } from '@mantine/modals';
import { IconCheck } from '@tabler/icons-react';

interface BookingFormProps {
  pkg: IPackage;
}

const schema = z.object({
  customer_name: z.string().min(1, { message: 'Invalid Fullname' }),
  customer_email: z.string().email({ message: 'Invalid email' }),
  customer_phone: z.string().min(10, { message: 'Invalid phone' }),
  note: z.string(),
  slip: z
    .object({
      id: z.number(),
      asset: z.string().min(1, { message: 'Please input your slip' }),
    })
    .partial(),
});

const BookingForm: FunctionComponent<BookingFormProps> = ({ pkg }) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      note: '',
      slip: {
        id: '',
        asset: '',
      },
    },
    validate: zodResolver(schema),
  });

  useEffect(() => {
    if (session?.user && !form.isTouched()) {
      form.setFieldValue(
        'customer_name',
        `${session?.user.first_name} ${session?.user.last_name}`
      );
      form.setFieldValue('customer_email', session?.user.username);
      form.setFieldValue('customer_phone', session?.user.phone);
      form.setFieldValue('customer_address', session?.user.address);
    }
  }, [session, form]);

  const { mutate: uploadProfile } = useMutation({
    mutationFn: async (file: File) => {
      var formdata = new FormData();
      formdata.append('asset', file);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/attachments.json`,
        formdata
      );
      return data;
    },
    onError: (err: AxiosError) => {
      ErrorModal({ title: 'Upload', content: err.response?.statusText });
    },
    onSuccess: (res) => {
      form.setFieldValue('slip', res);
      form.clearFieldError('slip');
    },
  });

  const { mutate: createBooking, isLoading } = useMutation({
    mutationFn: async (body: { booking: IBookingRequest }) => {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/bookings.json`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
        data: body,
      };
      const { data } = await axios.request(config);
      return data;
    },
    onError: (err: AxiosError) => {
      ErrorModal({ title: 'Booking', content: err.response?.statusText });
    },
    onSuccess: (res) => {
      modals.openConfirmModal({
        title: 'You successfully created your booking',
        centered: true,
        children: (
          <center>
            <ThemeIcon color='green' radius='xl' size='xl'>
              <IconCheck />
            </ThemeIcon>
            <Text mt='sm' size='sm'>{`Booking Ref: ${res.slug}`}</Text>
          </center>
        ),
        labels: { confirm: 'Ok', cancel: 'Cancel' },
        onConfirm: () => router.replace('/'),
        cancelProps: { display: 'none' },
      });
    },
  });

  const onBooking = (payload: IBookingRequest) => {
    createBooking({ booking: payload });
  };

  return (
    <div>
      <form
        onSubmit={form.onSubmit((values) => {
          const payload = {
            ...values,
            customer_name: 'pang dev',
            customer_email: 'pang@gmail.com',
            customer_phone: '0912221111',
            quantity: Number(searchParams.get('quantity')),
            package_id: pkg.id,
            local_guide_id: pkg.local_guide.id,
            tour_date: searchParams.get('tour_date') || '',
            price: pkg.price,
          };
          onBooking(payload);
        })}
      >
        <Paper p='sm'>
          <Text weight='bold'>ข้อมูลลูกค้า</Text>
          <TextInput
            mt='md'
            placeholder='Fullname'
            label='ชื่อ-สกุล'
            {...form.getInputProps('customer_name')}
          />
          <TextInput
            mt='md'
            placeholder='Email'
            label='อีเมล'
            {...form.getInputProps('customer_email')}
          />
          <TextInput
            mt='md'
            placeholder='Phone'
            label='เบอร์โทรศัพท์'
            {...form.getInputProps('customer_phone')}
          />
          <Textarea
            mt='md'
            placeholder='Note'
            label='หมายเหตุ'
            autosize
            minRows={2}
            {...form.getInputProps('note')}
          />
        </Paper>
        <Paper p='sm' mt='lg'>
          <Text weight='bold'>แจ้งการชำระเงิน</Text>
          <FileInput
            mt='md'
            label='อัพโหลดหลักฐานการชำระเงิน'
            placeholder='Click to Upload'
            error={form.errors['slip.asset']}
            onChange={(file) => file && uploadProfile(file as File)}
          />
          {form.values.slip.asset && (
            <Box
              mt='sm'
              className='relative aspect-square bg-zinc-100 rounded p-2'
            >
              <Image
                className='object-contain'
                src={`${process.env.NEXT_PUBLIC_URL}${form.values.slip.asset}`}
                alt='slip'
                fill
              />
            </Box>
          )}

          <Button
            mt='sm'
            variant='gradient'
            fullWidth
            type='submit'
            loading={isLoading}
          >
            ชำระเงิน
          </Button>
        </Paper>
      </form>
    </div>
  );
};

export default BookingForm;
