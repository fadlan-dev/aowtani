import OrganizationList from '@/components/OrganizationList';
import { getOrganizations } from '@/libs/services/getOrganizations';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: 'หน่วยงาน',
  ddescription: 'ที่ช่วยส่งเสริมชุมชนในพื้นที่',
};

const page = async ({ searchParams }: Props) => {
  const organize = await getOrganizations({
    page: Number(searchParams.page) || 1,
  });
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
