import ProductList from '@/components/ProductList';
import ProductSearch from '@/components/ProductSearch';
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
    <div className='mt-24 mb-24'>
      <ProductSearch showSearch />
    </div>
  );
};

export default page;
