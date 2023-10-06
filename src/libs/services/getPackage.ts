import { IPackage } from '@/types';

export const getPackage = async (id: string): Promise<IPackage> => {
  const res = await fetch(`${process.env.NEXT_API_HOST}/packages/${id}.json`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
};
