import AppShellItem from '@/components/AppShellItem';
import { IDestination, IPackage } from '@/types';

export const metadata = {
  title: 'Pattani smart tourism',
};

const getDestinations = async (): Promise<IDestination[]> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/destination_visits.json`
  );
  const destinations = await data.json();

  return destinations;
};

const getPackages = async (): Promise<IPackage[]> => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages.json`);
  const res = await data.json();
  return res;
};

export default async function Home() {
  const destinations = await getDestinations();
  const pkgs = await getPackages();
  return <AppShellItem destinations={destinations.slice(0, 6)} pkgs={pkgs} />;
}
