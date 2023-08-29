'use client';
import { Button } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className='flex flex-col justify-center mt-20 pb-20'
      style={{ minHeight: 'calc(100vh - 142px)' }}
    >
      <div className='container block text-center'>
        <IconAlertCircle size={42} color='red' />
        <h2>{error.message || ' Something went wrong!'}</h2>
        <Button mt='md' variant='outline' onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
