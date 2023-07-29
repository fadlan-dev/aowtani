import { IDestination } from '@/types';

export const getDestinations = async (): Promise<IDestination[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/destination_visits.json`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data;
};
