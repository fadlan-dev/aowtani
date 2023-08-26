import ProductList from '@/components/ProductList';
import ProductSearch from '@/components/ProductSearch';
import { getProducts } from '@/libs/services/getProducts';

type Props = {};
export const metadata = {
  title: 'ของฝาก',
};

const page = async (props: Props) => {
  const products = await getProducts({});
  return (
    <div className='mt-24 mb-24'>
      <ProductSearch showSearch />
      <ProductList data={products.data} total={products.total} />
    </div>
  );
};

export default page;
