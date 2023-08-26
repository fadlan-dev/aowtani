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
import { IOrderRequest, IProduct } from '@/types';
import { useRouter } from 'next/navigation';
import { modals } from '@mantine/modals';
import { IconCheck } from '@tabler/icons-react';

interface OrderFormProps {
  product: IProduct;
}

const schema = z.object({
  customer_name: z.string().min(1, { message: 'Invalid fullname' }),
  customer_email: z.string().email({ message: 'Invalid email' }),
  customer_phone: z.string().min(10, { message: 'Invalid phone' }),
  customer_address: z.string().min(1, { message: 'Invalid address' }),
  slip: z
    .object({
      id: z.number(),
      asset: z.string().min(1, { message: 'Please upload your slip' }),
    })
    .partial(),
});

const OrderForm: FunctionComponent<OrderFormProps> = ({ product }) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      customer_address: '',
      slip: {
        id: '',
        asset: '',
      },
    },
    validate: zodResolver(schema),
  });

  useEffect(() => {
    if (session?.user && !form.isValid('customer_name')) {
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

  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: async (body: { order: IOrderRequest }) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders.json`,
        body
      );
      return data;
    },
    onError: (err: AxiosError) => {
      ErrorModal({ title: 'Order', content: err.response?.statusText });
    },
    onSuccess: (res) => {
      modals.openConfirmModal({
        title: 'You successfully created your order',
        centered: true,
        children: (
          <center>
            <ThemeIcon color='green' radius='xl' size='xl'>
              <IconCheck />
            </ThemeIcon>
            <Text mt='sm' size='sm'>{`Order Ref: ${res.slug}`}</Text>
          </center>
        ),
        labels: { confirm: 'Ok', cancel: 'Cancel' },
        onConfirm: () => router.push('/product'),
        cancelProps: { display: 'none' },
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={form.onSubmit((values) => {
          const payload: IOrderRequest = {
            ...values,
            quantity: Number(searchParams.get('quantity')),
            product_id: product.id,
            order_at: new Date().toISOString(),
          };
          createOrder({ order: payload });
        })}
      >
        <Paper p='sm'>
          <Text weight='bold'>ข้อมูลลูกค้า</Text>
          <TextInput
            mt='md'
            placeholder='ชื่อ-สกุล'
            label='ชื่อ-สกุล'
            {...form.getInputProps('customer_name')}
          />
          <TextInput
            mt='md'
            placeholder='อีเมล'
            label='อีเมล'
            {...form.getInputProps('customer_email')}
          />
          <TextInput
            mt='md'
            placeholder='เบอร์โทรศัพท์'
            label='เบอร์โทรศัพท์'
            {...form.getInputProps('customer_phone')}
          />
          <Textarea
            mt='md'
            placeholder='ที่อยู่ในการจัดส่ง'
            label='ที่อยู่ในการจัดส่ง'
            autosize
            minRows={2}
            {...form.getInputProps('customer_address')}
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

export default OrderForm;