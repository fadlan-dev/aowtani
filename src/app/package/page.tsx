import BasciSearch from '@/components/BasicSearch';
import CommunityList from '@/components/CommunityList';
import PackageList from '@/components/PackageList';
import { getPackages } from '@/libs/services/getPackages';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export const metadata = {
  title: 'ทัวร์ท่องเที่ยว',
};

const Page = async ({ searchParams }: Props) => {
  const page = Number(searchParams.page) || 1;
  const packages = await getPackages({
    page: page,
    search: `${searchParams.search || ''}`,
  });


  return (
    <div className='pt-12 mb-24'>
      <center>
        <h1>ทัวร์ท่องเที่ยว</h1>
        <p>ตอบโจทย์ทุกไลฟ์สไตล์</p>
      </center>
      <BasciSearch placeholder='ค้นหาทัวร์ท่องเที่ยวที่ต้องการ' />
      <PackageList
            className="mt-4 px-4"
            data={packages?.data}
          />
    </div>
  );
};

export default Page;
