import { ILocalGuide } from '@/types';

export const getLocalGuides = async (): Promise<ILocalGuide[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/local_guides.json`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }

  const data = await res.json();
  return data;
};
