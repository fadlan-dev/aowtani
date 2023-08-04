import { IProduct } from '@/types';

export const getProducts = async (): Promise<IProduct[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products.json`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
};
