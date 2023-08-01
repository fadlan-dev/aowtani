import { IProduct } from '@/types';

export const getProduct = async (id: string): Promise<IProduct> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}.json`,
    { next: { revalidate: 3600 } } // revalidate at most every hour
  );
  const product = await data.json();
  return product;
};
