import OrganizationList from '@/components/OrganizationList';
import { getOrganizations } from '@/libs/services/getOrganizations';

export const metadata = {
  title: 'หน่วยงาน',
  ddescription: 'ที่ช่วยส่งเสริมชุมชนในพื้นที่',
};

const page = async () => {
  const organize = await getOrganizations();
  return (
    <div className='mt-20 mb-20'>
      <OrganizationList
        title='หน่วยงาน'
        subTitle='ที่ช่วยส่งเสริมชุมชนในพื้นที่'
        data={organize}
      />
    </div>
  );
};

export default page;
