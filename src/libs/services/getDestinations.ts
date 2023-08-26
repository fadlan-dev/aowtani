import { IDestination } from '@/types';

type props = {
  destination_type_id?: string;
  organization_id?: string;
  page?: number;
  per_page?: number;
};

export interface IResponse {
  data: IDestination[];
  total: number;
}

export const getDestinations = async ({
  destination_type_id,
  organization_id,
  page = 1,
  per_page = 6,
}: props): Promise<IResponse> => {
  let queryParams = '';

  if (destination_type_id) {
    queryParams += `destination_type_id=${destination_type_id}&`;
  }

  if (organization_id) {
    queryParams += `organization_id=${organization_id}`;
  }

  if (page) {
    queryParams += `page=${page}`;
  }

  if (per_page) {
    queryParams += `per_page=${per_page}`;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/destination_visits.json?${queryParams}`;
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
};
