import CommunityList from '@/components/CommunityList';
import { getCommunities } from '@/libs/services/getCommunities';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export const metadata = {
  title: 'ชุมชน',
};

const Page = async ({ searchParams }: Props) => {
  const page = Number(searchParams.page) || 1;
  const communities = await getCommunities({ page: page });
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
