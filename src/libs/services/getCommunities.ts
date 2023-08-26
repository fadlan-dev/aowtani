import { ICommunity } from '@/types';

interface props {
  page?: number;
  per_page?: number;
}

interface IResponse {
  data: ICommunity[];
  total: number;
}

export const getCommunities = async ({
  page = 1,
  per_page = 6,
}: props): Promise<IResponse> => {
  let queryParams = '';
  if (page) {
    queryParams += `page=${page}`;
  }

  if (per_page) {
    queryParams += `per_page=${per_page}`;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/communities.json?${queryParams}`;
  const res = await fetch(url, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
};
