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
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const LoginForm = (props: Props) => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });
  return (
    <Container size={420} className='w-full' my={40}>
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
          onClick={() => router.push('/register')}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form
          onSubmit={form.onSubmit((e) => {
            console.log('onSubmit', e);
          })}
        >
          <TextInput
            label='Email'
            placeholder='you@mantine.dev'
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
          />
          <PasswordInput
            label='Password'
            placeholder='Your password'
            mt='md'
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={form.errors.password}
          />
          <Group position='apart' mt='lg'>
            <Checkbox label='Remember me' />
            <Anchor component='button' size='sm'>
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

export default LoginForm;
