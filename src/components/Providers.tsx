'use client';
import React, { ReactNode } from 'react';
import CookieConsent from './CookieConsent';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <CookieConsent />
      {children}
    </SessionProvider>
  );
};

export default Providers;
