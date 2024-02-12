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
    <div className='pt-12 mb-24'>
      <center>
        <h1>หน่วยงาน</h1>
        <p>ที่ช่วยส่งเสริมชุมชนในพื้นที่</p>
      </center>
      <OrganizationList data={organize.data} total={organize.total} />
    </div>
  );
};

export default page;
