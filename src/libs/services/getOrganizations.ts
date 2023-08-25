import { IOrganization } from '@/types';

export const getOrganizations = async (): Promise<IOrganization[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/organizations.json`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
};
