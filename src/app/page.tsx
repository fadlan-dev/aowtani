'use client';
import { Button } from '@mantine/core';
import Image from 'next/image';
import HeroCarousel from '../components/HeroCarousel';
import TravelTrending from '@/components/TravelTrending';
import FavoriteFood from '@/components/FavoriteFood';
import RecommendedTourPackages from '@/components/RecommendedTourPackages';

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
