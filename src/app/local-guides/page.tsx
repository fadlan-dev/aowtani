import React from 'react';
import LocalGuideList from '@/components/LocalGuideList';
import { getLocalGuides } from '@/libs/services/getLocalGuides';

type Props = {};

export const metadata = {
  title: 'ไกด์ท้องถิ่น',
};

const Page = async (props: Props) => {
  const localGuides = await getLocalGuides({});

  return (
    <div className='mt-20 mb-20'>
      <LocalGuideList
        data={localGuides.data}
        total={localGuides.total}
        showPagination
        showSearch
        title='ไกด์ท้องถิ่น'
        subTitle='รวมทุกแนว สัมผัสได้ทุกวิถีชีวิต'
      />
    </div>
  );
};

export default Page;
