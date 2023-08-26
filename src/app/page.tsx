import AppShellItem from '@/components/AppShellItem';
import { getDestinations } from '@/libs/services/getDestinations';
import { getPackages } from '@/libs/services/getPackages';
import { getProducts } from '@/libs/services/getProducts';

export const metadata = {
  title: 'Pattani smart tourism',
};

export default async function Home() {
  const destinations = await getDestinations({});
  const pkgs = await getPackages({});
  const products = await getProducts({});
  return (
    <AppShellItem destinations={destinations} pkgs={pkgs} products={products} />
  );
}
