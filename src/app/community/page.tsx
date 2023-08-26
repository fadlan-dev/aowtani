import CommunityList from '@/components/CommunityList';
import { getCommunities } from '@/libs/services/getCommunities';
import React from 'react';

type Props = {};
export const metadata = {
  title: 'ชุมชน',
};

const Page = async (props: Props) => {
  const communities = await getCommunities({});
  return (
    <div className='mt-20 mb-24'>
      <CommunityList
        data={communities.data}
        total={communities.total}
        title='ชุมชน'
        subTitle='สัมผัสวิถีชีวิต'
        showSearch
      />
    </div>
  );
};

export default Page;
