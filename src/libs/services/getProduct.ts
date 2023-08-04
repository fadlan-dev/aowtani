import { IProduct } from '@/types';

export const getProduct = async (id: string): Promise<IProduct> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}.json`,
    { next: { revalidate: 3600 } } // revalidate at most every hour
  );

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const product = await res.json();
  return product;
};
