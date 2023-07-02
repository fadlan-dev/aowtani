import React from 'react';
import LocalGuidList from '@/components/LocalGuieList';

type Props = {};

export const metadata = {
  title: 'ไกด์ท้องถิ่น',
};

const Page = (props: Props) => {
  return (
    <div className='mt-20 mb-20'>
      <LocalGuidList
        showPagination
        showSearch
        title='ไกด์ท้องถิ่น'
        subTitle='รวมทุกแนว สัมผัสได้ทุกวิถีชีวิต'
      />
    </div>
  );
};

export default Page;
