import { ICommunity } from '@/types';

export const getCommunities = async (): Promise<ICommunity[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/communities.json`,
    {
      cache: 'no-cache',
    }
  );

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
};
