'use client';
import React, { ReactNode } from 'react';
import CookieConsent from './CookieConsent';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();
const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <CookieConsent />
        {children}
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
