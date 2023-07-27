import { IDestination } from '@/types';

export const getDestinations = async (): Promise<IDestination[]> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/destination_visits.json`,
    { next: { revalidate: 60 } }
  );
  const res = await data.json();
  return res;
};
