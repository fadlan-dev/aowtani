import AppShellItem from '@/components/AppShellItem';
import { getDestinations } from '@/libs/services/getDestinations';
import { getPackages } from '@/libs/services/getPackages';
import { getProducts } from '@/libs/services/getProducts';

export const metadata = {
  title: 'Pattani smart tourism',
};

export default async function Home() {
  const destinations = await getDestinations({
    per_page: 3,
    search: '',
  });
  const pkgs = await getPackages({
    per_page: 3,
    search: '',
  });
  const products = await getProducts({
    per_page: 3,
    search: '',
  });
  return (
    <AppShellItem destinations={destinations} pkgs={pkgs} products={products} />
  );
}
