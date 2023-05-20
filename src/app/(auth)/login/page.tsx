import React from 'react';

import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/forms/LoginForm';

type Props = {};

export const metadata = {
  title: 'Login',
};

const Login = (props: Props) => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <LoginForm />
    </div>
  );
};

export default Login;
