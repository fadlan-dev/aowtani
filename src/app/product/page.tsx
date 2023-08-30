import BasciSearch from '@/components/BasicSearch';
import ProductList from '@/components/ProductList';
import { getProducts } from '@/libs/services/getProducts';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export const metadata = {
  title: 'ของฝาก',
};

const page = async ({ searchParams }: Props) => {
  const products = await getProducts({
    page: Number(searchParams.page) || 1,
  });
  return (
    <div className='mt-20 mb-24'>
      <center>
        <h1>ของฝาก</h1>
        <p>ช้อปปิ้งได้ทุกเวลา</p>
      </center>
      <BasciSearch placeholder='ค้นหาของฝากที่ต้องการ' />
      <ProductList data={products.data} total={products.total} />
    </div>
  );
};

export default page;
