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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
type Props = {};

const RegisterForm = (props: Props) => {
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
          <PasswordInput
            label='Confirm'
            placeholder='Confirm your password'
            mt='md'
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('confirm', event.currentTarget.value)
            }
            error={form.errors.password}
          />
          <Button fullWidth mt='xl' type='submit'>
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
