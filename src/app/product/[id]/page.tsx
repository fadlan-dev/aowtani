import ProductHero from '@/components/ProductHero';
import { getProduct } from '@/libs/services/getProduct';
import { IProduct } from '@/types';

interface pageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: pageProps) {
  const product: IProduct = await getProduct(params.id);
  return {
    title: product.name,
    description: product.details,
    openGraph: {
      images: [
        `${process.env.NEXT_PUBLIC_URL}${product.images?.[0].asset}`,
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      ],
    },
  };
}

const Page = async ({ params }: pageProps) => {
  const product = await getProduct(params.id);
  return (
    <div className='mt-20 mb-20'>
      <div className='container overflow-hidden'>
        <ProductHero product={product} />

        <div
          id='ck-editor'
          className='mt-4 relative'
          dangerouslySetInnerHTML={{ __html: product.details }}
        />
      </div>
    </div>
  );
};

export default Page;
