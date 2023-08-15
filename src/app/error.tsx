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
      className='flex flex-col justify-center mt-20 pb-20'
      style={{ minHeight: 'calc(100vh - 142px)' }}
    >
      <div className='container block text-center'>
        <h2>{error.message || ' Something went wrong!'}</h2>
        <div>
          <code className='whitespace-pre-wrap break-words'>{error.stack}</code>
        </div>
        <Button mt='md' variant='outline' onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
