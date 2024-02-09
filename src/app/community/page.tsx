import BasciSearch from '@/components/BasicSearch';
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
  const communities = await getCommunities({
    page: page,
    search: `${searchParams.search || ''}`,
  });
  return (
    <div className='pt-12 mb-24'>
      <center>
        <h1>ชุมชน</h1>
        <p>สัมผัสวิถีชีวิต</p>
      </center>
      <BasciSearch placeholder='ค้นหาชุมชนที่ต้องการ' />
      <CommunityList data={communities.data} total={communities.total} />
    </div>
  );
};

export default Page;
