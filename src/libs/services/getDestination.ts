import { IDestination } from '@/types';

export const getDestination = async (id: string): Promise<IDestination> => {
  const res = await fetch(
    `${process.env.NEXT_API_HOST}/destination_visits/${id}.json`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
};
