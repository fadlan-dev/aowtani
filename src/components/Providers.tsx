'use client';
import React, { ReactNode } from 'react';
import CookieConsent from './CookieConsent';

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <>
      <CookieConsent />
      {children}
    </>
  );
};

export default Providers;
