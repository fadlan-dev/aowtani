import CommunityList from '@/components/CommunityList';
import React from 'react';

type Props = {};
export const metadata = {
  title: 'ชุมชน',
};

const Page = (props: Props) => {
  return (
    <div className='mt-24 mb-24'>
      <CommunityList title='ชุมชน' subTitle='สัมผัสวิถีชีวิต' showSearch />
    </div>
  );
};

export default Page;
