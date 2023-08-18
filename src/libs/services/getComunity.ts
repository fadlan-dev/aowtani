import { ICommunity } from '@/types';

export const getCommunity = async (id: string): Promise<ICommunity> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/communities/${id}.json`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
};
