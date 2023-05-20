'use client';
import { Button } from '@mantine/core';

export default function Custom404() {
  const height = 'calc(100vh - 143px)';
  return (
    <div
      style={{ minHeight: height }}
      className='flex items-center justify-center'
    >
      <div className='flex items-center flex-col gap-2'>
        <p className='text-9xl font-bold w-fit text-slate-200'>404</p>
        <p className='text-center font-semibold'>
          You have found a secret place.
        </p>
        <p className='max-w-md text-sm text-slate-500 text-center'>
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </p>
        <div className=' text-cetner'>
          <Button variant='subtle'> Take me back to home page</Button>
        </div>
      </div>
    </div>
  );
}
