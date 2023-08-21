'use client';
import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Title,
  TextInput,
  Text,
  Container,
  Select,
  FileButton,
  Loader,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IconPlus } from '@tabler/icons-react';
import { z } from 'zod';
import { IUser } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ModalsProvider, modals } from '@mantine/modals';
import { cn } from '@/libs/utils';
type Props = {};

const RegisterForm = (props: Props) => {
  const router = useRouter();

  const schema = z
    .object({
      profile: z.object({ id: z.number(), asset: z.string() }).partial(),
      username: z.string().email(),
      name_title: z.string().min(1, { message: 'Pleas input your name titme' }),
      first_name: z.string().min(1, { message: 'Pleas input your first name' }),
      last_name: z.string().min(1, { message: 'Pleas input your last name' }),
      phone: z.string().length(10, { message: 'Please input your phone' }),
      address: z.string().min(1, { message: 'Pleas input your address' }),
      post_code: z
        .string()
        .length(5, { message: 'Please input your zip code' }),
      password: z.string().min(6, { message: 'Please input your password' }),
      confirm: z.string().min(6, { message: 'Please input your password' }),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Password doesn't match",
      path: ['confirm'],
    });

  const form = useForm({
    initialValues: {
      profile: {
        id: '',
        asset: '',
      },
      username: '',
      name_title: '',
      first_name: '',
      last_name: '',
      phone: '',
      address: '',
      post_code: '',
      password: '',
      confirm: '',
    },
    validate: zodResolver(schema),
  });

  const { mutate: uploadProfile, isLoading } = useMutation({
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
      openErrModal({ title: 'Upload', content: err.response?.statusText });
    },
    onSuccess: (res) => {
      form.setFieldValue('profile', res);
    },
  });

  const handleFileChange = (file: File) => uploadProfile(file);

  const openErrModal = ({
    title,
    content,
  }: {
    title: string;
    content: string | undefined;
  }) =>
    modals.openConfirmModal({
      title: title,
      centered: true,
      children: (
        <Text size='sm'>
          {content || `Comment wasn't created successfully. Please try again.`}
        </Text>
      ),
      labels: { confirm: 'Ok', cancel: 'cancel' },
      cancelProps: { display: 'none' },
    });

  const { mutate: Regsiter, isLoading: resiterLoading } = useMutation({
    mutationFn: async (payload: IUser) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/customers.json`,
        { customer: payload }
      );
      return data;
    },
    onError: (err: AxiosError) => {
      openErrModal({ title: 'Register', content: err.response?.statusText });
    },
    onSuccess: (res) => {
      router.replace('/sign-in');
    },
  });

  const handleRegister = (values: IUser) => {
    const payload = values;
    Regsiter(payload);
  };

  return (
    <ModalsProvider>
      <Container size={420} className='w-full'>
        <Title
          align='center'
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Register
        </Title>
        <Text color='dimmed' size='sm' align='center' mt={5}>
          Already have an account?{' '}
          <Anchor
            size='sm'
            component='button'
            onClick={() => router.push('/login')}
          >
            Login
          </Anchor>
        </Text>
        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <form
            className='flex flex-col gap-2'
            onSubmit={form.onSubmit((values) => handleRegister(values))}
          >
            <div className='m-auto text-center'>
              <FileButton
                onChange={handleFileChange}
                accept='image/png,image/jpeg'
              >
                {(props) =>
                  form.values.profile.asset ? (
                    <Image
                      {...props}
                      width={120}
                      height={120}
                      src={`${process.env.NEXT_PUBLIC_URL}${form.values.profile?.asset}`}
                      alt={''}
                      className='m-auto border border-dashed border-zinc-200 p-2'
                    />
                  ) : (
                    <>
                      <Paper
                        m='auto'
                        withBorder
                        {...props}
                        className={cn(
                          'flex flex-col items-center justify-center gap-2 w-28 aspect-square border-dashed',
                          form.errors['profile.id'] && 'border-red-500'
                        )}
                      >
                        {isLoading ? (
                          <>
                            <Loader size={16} />
                            <Text size='sm'>Uploading</Text>
                          </>
                        ) : (
                          <>
                            <IconPlus size={16} />
                            <Text size='sm'>Upload</Text>
                          </>
                        )}
                      </Paper>
                    </>
                  )
                }
              </FileButton>
              {!form.values.profile.id && form.errors['profile.id'] && (
                <Text color='red' size='sm'>
                  Please upload your profile
                </Text>
              )}
            </div>
            <TextInput
              label='Username'
              placeholder='example.@gmail.com'
              {...form.getInputProps('username')}
            />
            <Select
              label='คำนำหน้า'
              data={[
                { value: 'mr', label: 'นาย' },
                { value: 'ms', label: 'นางสาว' },
              ]}
              {...form.getInputProps('name_title')}
            />
            <TextInput
              label='ชื่อ'
              placeholder='ชื่อ'
              {...form.getInputProps('first_name')}
            />
            <TextInput
              label='นามสกุล'
              placeholder='นามสกุล'
              {...form.getInputProps('last_name')}
            />
            <TextInput
              label='เบอร์โทรศัพท์'
              placeholder='เบอร์โทรศัพท์'
              {...form.getInputProps('phone')}
            />
            <TextInput
              label='ที่อยู่'
              placeholder='ที่อยู่'
              {...form.getInputProps('address')}
            />
            <TextInput
              label='รหัสไปรษณีย์'
              placeholder='รหัสไปรษณีย์'
              {...form.getInputProps('post_code')}
            />
            <PasswordInput
              label='Password'
              placeholder='Your password'
              mt='md'
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label='Confirm'
              placeholder='Confirm your password'
              mt='md'
              {...form.getInputProps('confirm')}
            />
            <Button fullWidth mt='xl' type='submit' loading={resiterLoading}>
              Sign up
            </Button>
          </form>
        </Paper>
      </Container>
    </ModalsProvider>
  );
};

export default RegisterForm;
