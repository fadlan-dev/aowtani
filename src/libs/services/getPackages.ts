import { IPackage } from '@/types';

export const getPackages = async (): Promise<IPackage[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages.json`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
};
