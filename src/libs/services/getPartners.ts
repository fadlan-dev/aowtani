import { IPartner } from '@/types';

interface props {
  type?: 'Hotel' | 'Restaurant' | 'TourActivity' | 'Shop';
  page?: number;
  per_page?: number;
}

interface IResponse {
  data: IPartner[];
  total: number;
}

export const getPartners = async ({
  type,
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

  const url = `${process.env.NEXT_PUBLIC_API_URL}/business_partners.json?${queryParams}`;
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
};
