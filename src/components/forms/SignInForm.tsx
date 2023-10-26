'use client';
import {
  Container,
  Title,
  Text,
  Paper,
  Anchor,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { signIn } from 'next-auth/react';
import { z } from 'zod';

type Props = {
  p?: number;
};

const SignInForm = ({ p }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callback') || '/';

  const schema = z.object({
    username: z.string().min(1, { message: 'Please input your username' }),
    password: z.string().min(6, { message: 'Please input your password' }),
  });

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: zodResolver(schema),
  });

  return (
    <Container size={420} className='w-full'>
      <Title
        align='center'
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color='dimmed' size='sm' align='center' mt={5}>
        Do not have an account yet?{' '}
        <Anchor
          size='sm'
          component='button'
          onClick={() => router.push('/sign-up')}
        >
          Create account
        </Anchor>
      </Text>

      <Paper mt={30} p={p} mb='lg' radius='md'>
        <form
          onSubmit={form.onSubmit(async (values) => {
            const res = await signIn('credentials', {
              ...values,
              callbackUrl: `${callbackUrl}`,
              redirect: false,
            });

            if (res?.ok) {
              router.push(`${callbackUrl}`);
            } else {
              console.log(res);
            }
          })}
        >
          <TextInput
            label='Username'
            placeholder='Username'
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label='Password'
            placeholder='Your password'
            mt='md'
            {...form.getInputProps('password')}
          />
          <Group position='apart' mt='lg'>
            <Checkbox label='Remember me' />
            <Anchor
              component='button'
              size='sm'
              onClick={() => router.push('forgotpassword')}
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt='xl' type='submit'>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignInForm;
