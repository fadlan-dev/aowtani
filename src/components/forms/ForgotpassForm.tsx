'use client';
import {
  Container,
  Title,
  Text,
  Paper,
  TextInput,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const ForgotpasswordForm = (props: Props) => {
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
        Forgot Password
      </Title>
      <Text color='dimmed' size='sm' align='center' mt={5}>
        Enter your email and we'll send you a link to reset your password
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
          <Button fullWidth mt='xl' type='submit'>
            Submit
          </Button>
          <Button
            fullWidth
            mt='xl'
            variant='white'
            leftIcon={<IconArrowLeft />}
            onClick={() => router.push('/login')}
          >
            Back to Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotpasswordForm;
