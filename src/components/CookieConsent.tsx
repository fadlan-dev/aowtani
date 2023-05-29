'use client';
import { useEffect, useState } from 'react';
import { hasCookie, setCookie } from 'cookies-next';
import { Button } from '@mantine/core';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(true);

  useEffect(() => {
    setShowConsent(hasCookie('localConsent'));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie('localConsent', 'true', {});
  };

  if (showConsent) {
    return null;
  }

  return (
    <div className='fixed z-50 inset-0 bg-slate-700 bg-opacity-70'>
      <div className='fixed bottom-0 left-0 right-0 flex items-center justify-between px-4 py-8 bg-gray-100'>
        <span className='text-dark text-base mr-16'>
          This website uses cookies to improve user experience. By using our
          website you consent to all cookies in accordance with our Cookie
          Policy.
        </span>
        <Button variant='gradient' onClick={() => acceptCookie()}>
          Accept
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
