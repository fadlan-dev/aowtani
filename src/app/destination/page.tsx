import React from 'react';
import DestinationList from '@/components/DestinationList';
type Props = {};

export const metadata = {
  title: 'สถานที่ท่องเที่ยว',
};

const page = (props: Props) => {
  return (
    <div className='mt-24'>
      <DestinationList className='mt-6' />
    </div>
  );
};

export default page;