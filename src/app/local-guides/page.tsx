import React from 'react';
import HeroGrid from '@/components/HeroGrid';

type Props = {};

export const metadata = {
  title: 'About',
  description: 'Generated by create next app',
};

const About = (props: Props) => {
  return (
    <div className='mt-[60px]'>
      <div className='container'>
        <HeroGrid />
        <div className='mt-6'>
          <h2 className='font-bold'>Local guides</h2>
        </div>
      </div>
    </div>
  );
};

export default About;
