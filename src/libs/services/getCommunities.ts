import { ICommunity } from '@/types';

export const getCommunities = async (): Promise<ICommunity[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/communities.json`,
    {
      cache: 'no-cache',
    }
  );
  const data = await res.json();
  return data;
};
