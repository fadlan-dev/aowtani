'use client';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';

type Props = {};

const HeroGrid = (props: Props) => {
  const matches = useMediaQuery('(min-width: 768px)');
  return (
    <div
      className={`grid  ${
        matches ? 'grid-cols-4 grid-rows-2' : 'grid-cols-1 grid-rows-1'
      } gap-1 h-96`}
    >
      {new Array(5)
        .slice(0, matches ? 5 : 1)
        .fill('')
        .map((item, idx) => (
          <div
            key={idx}
            className={`bg-zinc-100 grid place-content-center ${
              idx === 0
                ? matches
                  ? 'col-start-1 col-end-3 row-start-1 row-end-3'
                  : ''
                : ''
            }`}
          >
            {idx + 1}
          </div>
        ))}
    </div>
  );
};

export default HeroGrid;
