'use client';
import { Button } from '@mantine/core';
import React from 'react';
import FoodItem from './FoodItem';

type Props = {
  className?: string;
};

const FoodList = ({ className }: Props) => {
  return (
    <>
      <ul
        className={`grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0 ${className}`}
      >
        {new Array(6).fill('').map((food, idx) => (
          <FoodItem id={Math.random()} key={idx} />
        ))}
      </ul>
      <div className='text-center mt-4'>
        <Button variant='light'>Loadmore</Button>
      </div>
    </>
  );
};

export default FoodList;
