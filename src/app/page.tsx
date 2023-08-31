import AppShellItem from '@/components/AppShellItem';
import { getDestinations } from '@/libs/services/getDestinations';
import { getPackages } from '@/libs/services/getPackages';
import { getPartners } from '@/libs/services/getPartners';
import { getProducts } from '@/libs/services/getProducts';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: 'Pattani smart tourism',
};

export default async function Home({ searchParams }: Props) {
  const destinations = await getDestinations({
    organization_id: (searchParams.organization_id as string) || undefined,
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

  const hotels = await getPartners({ type: 'Hotel', per_page: 3, search: '' });

  const restaurants = await getPartners({
    type: 'Restaurant',
    per_page: 3,
    search: '',
  });
  return (
    <AppShellItem
      destinations={destinations}
      pkgs={pkgs}
      products={products}
      hotels={hotels}
      restaurants={restaurants}
    />
  );
}
