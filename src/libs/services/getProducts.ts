import { IProduct } from '@/types';

export const getProducts = async (): Promise<IProduct[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products.json`, {
    cache: 'no-store',
  });
  const data = await res.json();

  return data;
};
