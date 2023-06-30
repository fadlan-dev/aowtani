import React from 'react';

import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import SignInForm from '@/components/forms/SignInForm';

type Props = {};

export const metadata = {
  title: 'Sign In',
};

const page = (props: Props) => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <SignInForm withBorder />
    </div>
  );
};

export default page;
