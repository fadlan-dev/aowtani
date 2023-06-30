'use client';
import SignInForm from '@/components/forms/SignInForm';
import { Modal } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Modal
      opened={pathname === '/sign-in'}
      onClose={() => router.back()}
      centered
    >
      <SignInForm />
    </Modal>
  );
};

export default Page;
