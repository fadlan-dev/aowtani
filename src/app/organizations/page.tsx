import OrganizationList from '@/components/OrganizationList';
import { getOrganizations } from '@/libs/services/getOrganizations';

export const metadata = {
  title: 'หน่วยงาน',
  ddescription: 'ที่ช่วยส่งเสริมชุมชนในพื้นที่',
};

const page = async () => {
  const organize = await getOrganizations({});
  return (
    <div className='mt-20 mb-20'>
      <OrganizationList
        data={organize.data}
        total={organize.total}
        title='หน่วยงาน'
        subTitle='ที่ช่วยส่งเสริมชุมชนในพื้นที่'
      />
    </div>
  );
};

export default page;
