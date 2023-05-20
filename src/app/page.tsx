import HeroCarousel from '../components/HeroCarousel';
import TravelTrending from '@/components/TravelTrending';
import FavoriteFood from '@/components/FavoriteFood';
import RecommendedTourPackages from '@/components/RecommendedTourPackages';

export const metadata = {
  title: 'Pattani smart tourism',
};

export default function Home() {
  return (
    <div>
      <HeroCarousel className=' mt-[60px]' />
      <TravelTrending />
      <RecommendedTourPackages />
      <FavoriteFood />
    </div>
  );
}
