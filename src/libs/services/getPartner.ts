import { IPartner } from '@/types';

export const getPartner = async (id: string): Promise<IPartner> => {
  const res = await fetch(
    `${process.env.NEXT_API_HOST}/business_partners/${id}.json`,
    { next: { revalidate: 3600 } } // revalidate at most every hour
  );

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const partner = await res.json();
  return partner;
};
