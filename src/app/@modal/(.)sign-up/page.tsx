'use client';
import SignUpForm from '@/components/forms/SignUpForm';
import { Modal } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Modal
      opened={pathname === '/sign-up'}
      onClose={() => router.back()}
      centered
    >
      <SignUpForm />
    </Modal>
  );
};

export default Page;
