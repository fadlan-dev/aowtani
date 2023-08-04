import { IDestination } from '@/types';

export const getDestinations = async (): Promise<IDestination[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/destination_visits.json`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
};
