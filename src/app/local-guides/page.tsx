import React from 'react';
import LocalGuideList from '@/components/LocalGuieList';
import { ILocalGuide, IPackage } from '@/types';

type Props = {};

export const metadata = {
  title: 'ไกด์ท้องถิ่น',
};

const getLocalGuides = async (): Promise<ILocalGuide[]> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/local_guides.json`
  );
  const res = await data.json();
  return res;
};

const Page = async (props: Props) => {
  const localGuides = await getLocalGuides();

  return (
    <div className='mt-20 mb-20'>
      <LocalGuideList
        data={localGuides}
        showPagination
        showSearch
        title='ไกด์ท้องถิ่น'
        subTitle='รวมทุกแนว สัมผัสได้ทุกวิถีชีวิต'
      />
    </div>
  );
};

export default Page;
