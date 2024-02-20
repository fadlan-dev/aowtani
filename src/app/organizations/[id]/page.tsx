import CommunityItem from '@/components/CommunityItem';
import CommunityList from '@/components/CommunityList';
import DestinationList from '@/components/DestinationList';
import LocalGuideItem from '@/components/LocalGuideItem';
import OrganizationItem from '@/components/OrganizationItem';
import PackageList from '@/components/PackageList';
import { getCommunities } from '@/libs/services/getCommunities';
import { getDestinations } from '@/libs/services/getDestinations';
import { getPackages } from '@/libs/services/getPackages';
import { IOrganization } from '@/types';

type Props = {
  params: { id: string };
};

// export async function generateMetadata({ params }: Props) {

export const metadata = {
  title: 'หน่วยงาน',
  ddescription: 'ที่ช่วยส่งเสริมชุมชนในพื้นที่',
};

const getOrganize = async (id: string): Promise<IOrganization> => {
  const data = await fetch(
    `${process.env.NEXT_API_HOST}/organizations/${id}.json`
  );
  const res = await data.json();
  return res;
};

const Page = async ({ params }: Props) => {
  const organize = await getOrganize(params.id);
  const destinations = await getDestinations({organization_id: params.id});
  const communities = await getCommunities({organization_id: params.id})
  // console.log({destinations})

  return (
    <div className='mb-20'>
       <div className='px-4'>
        <OrganizationItem data={organize} height={300}/>
        <div className='pt-6'>
        <h2>สถานที่ท่องเที่ยว</h2>
        <DestinationList data={destinations.data} total={destinations.total}/>
        </div>
        <div className='pt-6'>
        <h2>ชุมชนท่องเที่ยว</h2>
        <CommunityList data={communities.data} total={communities.total}/>
        </div>
      </div>
    </div>
  );
};


export default Page
