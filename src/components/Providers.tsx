'use client';
import React, { ReactNode, useEffect } from 'react';
import CookieConsent from './CookieConsent';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages: string;
              layout: number;
            },
            elementId: string
          ): void;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
  }
}

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();
const Providers = ({ children }: Props) => {
  useEffect(() => {
    var addScript = document.createElement('script');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'th',
        includedLanguages: 'th,en,ms', // If you remove it, by default all google supported language will be included
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element'
    );
  };

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
