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
import { ModalsProvider } from '@mantine/modals';
import { cn } from '@/libs/utils';
import { ErrorModal } from '@/hooks/error-modal';
type Props = {
  p?: number;
};

const RegisterForm = ({ p }: Props) => {
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
        `${process.env.NEXT_IMAGE_HOST}/attachments.json`,
        formdata
      );
      return data;
    },
    onError: (err: AxiosError) => {
      ErrorModal({ title: 'Upload', content: err.response?.statusText });
    },
    onSuccess: (res) => {
      form.setFieldValue('profile', res);
    },
  });

  const handleFileChange = (file: File) => uploadProfile(file);

  const { mutate: RegsiterApi, isLoading: registerLoading } = useMutation({
    mutationFn: async (payload: IUser) => {
      const { data } = await axios.post(
        `${process.env.NEXT_API_HOST}/customers.json`,
        { customer: payload }
      );
      return data;
    },
    onError: (err: AxiosError) => {
      ErrorModal({
        title: 'Register',
        content: JSON.stringify(err.response?.data, null),
      });
    },
    onSuccess: (res) => {
      router.replace('/sign-in');
    },
  });

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
          ลงทะเบียน
        </Title>
        <Text color='dimmed' size='sm' align='center' mt={5}>
          มีบัญชีแล้วใช่ไหม?{' '}
          <Anchor
            size='sm'
            component='button'
            onClick={() => router.push('/login')}
          >
            เข้าสู่ระบบ
          </Anchor>
        </Text>
        <Paper mt={30} p={p} mb='lg' radius='md'>
          <form
            className='flex flex-col gap-2'
            onSubmit={form.onSubmit((values) => {
              RegsiterApi(values);
            })}
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
                      src={`${process.env.NEXT_IMAGE_HOST}${form.values.profile?.asset}`}
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
                            <Text size='sm'>กำลังอัปโหลด</Text>
                          </>
                        ) : (
                          <>
                            <IconPlus size={16} />
                            <Text size='sm'>อัปโหลด</Text>
                          </>
                        )}
                      </Paper>
                    </>
                  )
                }
              </FileButton>
              {!form.values.profile.id && form.errors['profile.id'] && (
                <Text color='red' size='sm'>
                  กรุณาอัปโหลดโปรไฟล์ของคุณ
                </Text>
              )}
            </div>
            <TextInput
              label='อีเมล์'
              placeholder='aowtani.@gmail.com'
              {...form.getInputProps('username')}
            />
            <TextInput
              label='คำนำหน้า'
              placeholder='นาย / นางสาว'
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
              label='รหัสผ่าน'
              placeholder='กรอกรหัสผ่าน'
              description="รหัสผ่านต้องมีความยาวมากกว่า 6 ตัวอักษร"
              mt='md'
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label='ยืนยันรหัสผ่าน'
              placeholder='กรอกรหัสผ่านอีกครั้ง'
              description="รหัสผ่านต้องมีความยาวมากกว่า 6 ตัวอักษร"
              mt='md'
              {...form.getInputProps('confirm')}
            />
            <Button fullWidth mt='xl' type='submit' loading={registerLoading}>
             ลงทะเบียน
            </Button>
          </form>
        </Paper>
      </Container>
    </ModalsProvider>
  );
};

export default RegisterForm;
