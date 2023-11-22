import ProductHero from '@/components/ProductHero';
import Reviews from '@/components/Reviews';
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
      images: [`${process.env.NEXT_IMAGE_HOST}${product.images?.[0].asset}`],
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
        <Reviews variant='products' className='mt-6' />
      </div>
    </div>
  );
};

export default Page;
