import NewsList from '@/components/NewsList';
import React from 'react';

type Props = {};

export const metadata = {
  title: 'News',
};

const Page = (props: Props) => {
  return (
    <div className='mt-[60px]'>
      <div className='h-80 grid place-content-center bg-banner-news bg-no-repeat bg-cover bg-center'>
        <p className='text-white text-5xl font-bold'>Entrepreneurs</p>
      </div>
      <div className='container'>
        <NewsList className='mt-6' />
      </div>
    </div>
  );
};

export default Page;
