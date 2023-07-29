import { ILocalGuide } from '@/types';

export const getLocalGuides = async (): Promise<ILocalGuide[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/local_guides.json`,
    {
      cache: 'no-store',
    }
  );
  const data = await res.json();
  return data;
};
