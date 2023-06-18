import SouvenirList from '@/components/SouvenirList';
import React from 'react';

type Props = {};
export const metadata = {
  title: 'ผู้ประกอบการ',
};

const page = (props: Props) => {
  return (
    <div className='mt-24 mb-24'>
      <SouvenirList showSearch title='ผู้ประกอบการ' subTitle='subTitle' />
    </div>
  );
};

export default page;
