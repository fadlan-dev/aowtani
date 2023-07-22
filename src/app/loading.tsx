'use client';
import { LoadingOverlay } from '@mantine/core';

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <LoadingOverlay visible overlayBlur={0.2} />
    </div>
  );
};

export default Loading;
