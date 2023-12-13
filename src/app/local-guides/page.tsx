import React from 'react';
import LocalGuideList from '@/components/LocalGuideList';
import { getLocalGuides } from '@/libs/services/getLocalGuides';
import BasciSearch from '@/components/BasicSearch';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: 'ไกด์ท้องถิ่น',
};

const Page = async ({ searchParams }: Props) => {
  const localGuides = await getLocalGuides({
    page: Number(searchParams.page) || 1,
    search: `${searchParams.search || ''}`,
  });

  return (
    <div className='pt-24 mb-24'>
      <center>
        <h1>ไกด์ท้องถิ่น</h1>
        <p>รวมทุกแนว สัมผัสได้ทุกวิถีชีวิต</p>
      </center>
      <BasciSearch placeholder='ค้นหาสถานทที่ต้องการ' />
      <LocalGuideList
        data={localGuides.data}
        total={localGuides.total}
        showPagination
      />
    </div>
  );
};

export default Page;
