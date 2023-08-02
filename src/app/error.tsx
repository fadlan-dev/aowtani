'use client';

import { Button } from '@mantine/core';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className='flex flex-col  justify-center'
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <div className='container block text-center'>
        <h2>{error.message || ' Something went wrong!'}</h2>
        <p>{error.stack}</p>
        <Button mt='md' variant='outline' onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
