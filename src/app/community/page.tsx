import CommunityList from '@/components/CommunityList';
import { ICommunity } from '@/types';
import React from 'react';

type Props = {};
export const metadata = {
  title: 'ชุมชน',
};

const getCommunities = async (): Promise<ICommunity[]> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/communities.json`
  );
  const communities = await data.json();

  return communities;
};

const Page = async (props: Props) => {
  const communities = await getCommunities();
  return (
    <div className='mt-20 mb-24'>
      <CommunityList
        data={communities}
        title='ชุมชน'
        subTitle='สัมผัสวิถีชีวิต'
        showSearch
      />
    </div>
  );
};

export default Page;
