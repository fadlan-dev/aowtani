import { IPartner } from '@/types';

export const getPartners = async ({
  type,
}: {
  type: 'Hotel' | 'Restaurant' | 'TourActivity' | 'Shop';
}): Promise<IPartner[]> => {
  const res = await fetch(
    type
      ? `${process.env.NEXT_PUBLIC_API_URL}/business_partners.json?type=${type}`
      : `${process.env.NEXT_PUBLIC_API_URL}/business_partners.json`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
};
