'use client';
import React from 'react';
import NewsItem from './NewsItem';
import { Button, Center, SegmentedControl } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  className?: string;
};

const NewsList = ({ className }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const NEWS = [
    {
      id: Math.random(),
      title: 'Nulla labore eiusmod aute culpa Lorem.',
      desc: 'Aute laboris nulla ex Lorem tempor excepteur. Cupidatat commodo magna duis commodo velit nostrud tempor aliquip dolore irure quis. Non veniam labore amet ad aliqua ipsum dolor sunt mollit sint non. Deserunt enim ex nostrud dolore aute commodo sint occaecat id eiusmod pariatur deserunt. Est sint enim labore consequat. Amet aute pariatur ea duis culpa esse excepteur qui laboris id minim tempor. Esse consectetur cupidatat aliqua reprehenderit nisi laboris voluptate cillum. Et adipisicing enim est sunt reprehenderit consectetur tempor nostrud duis minim consequat ipsum nisi. Consequat pariatur eu cupidatat sunt.',
    },
    {
      id: Math.random(),
      title: 'Nulla labore eiusmod aute culpa Lorem.',
      desc: 'Aute laboris nulla ex Lorem tempor excepteur. Cupidatat commodo magna duis commodo velit nostrud tempor aliquip dolore irure quis. Non veniam labore amet ad aliqua ipsum dolor sunt mollit sint non. Deserunt enim ex nostrud dolore aute commodo sint occaecat id eiusmod pariatur deserunt. Est sint enim labore consequat. Amet aute pariatur ea duis culpa esse excepteur qui laboris id minim tempor. Esse consectetur cupidatat aliqua reprehenderit nisi laboris voluptate cillum. Et adipisicing enim est sunt reprehenderit consectetur tempor nostrud duis minim consequat ipsum nisi. Consequat pariatur eu cupidatat sunt.',
    },
    {
      id: Math.random(),
      title: 'Nulla labore eiusmod aute culpa Lorem.',
      desc: 'Aute laboris nulla ex Lorem tempor excepteur. Cupidatat commodo magna duis commodo velit nostrud tempor aliquip dolore irure quis. Non veniam labore amet ad aliqua ipsum dolor sunt mollit sint non. Deserunt enim ex nostrud dolore aute commodo sint occaecat id eiusmod pariatur deserunt. Est sint enim labore consequat. Amet aute pariatur ea duis culpa esse excepteur qui laboris id minim tempor. Esse consectetur cupidatat aliqua reprehenderit nisi laboris voluptate cillum. Et adipisicing enim est sunt reprehenderit consectetur tempor nostrud duis minim consequat ipsum nisi. Consequat pariatur eu cupidatat sunt.',
    },
    {
      id: Math.random(),
      title: 'Nulla labore eiusmod aute culpa Lorem.',
      desc: 'Aute laboris nulla ex Lorem tempor excepteur. Cupidatat commodo magna duis commodo velit nostrud tempor aliquip dolore irure quis. Non veniam labore amet ad aliqua ipsum dolor sunt mollit sint non. Deserunt enim ex nostrud dolore aute commodo sint occaecat id eiusmod pariatur deserunt. Est sint enim labore consequat. Amet aute pariatur ea duis culpa esse excepteur qui laboris id minim tempor. Esse consectetur cupidatat aliqua reprehenderit nisi laboris voluptate cillum. Et adipisicing enim est sunt reprehenderit consectetur tempor nostrud duis minim consequat ipsum nisi. Consequat pariatur eu cupidatat sunt.',
    },
    {
      id: Math.random(),
      title: 'Nulla labore eiusmod aute culpa Lorem.',
      desc: 'Aute laboris nulla ex Lorem tempor excepteur. Cupidatat commodo magna duis commodo velit nostrud tempor aliquip dolore irure quis. Non veniam labore amet ad aliqua ipsum dolor sunt mollit sint non. Deserunt enim ex nostrud dolore aute commodo sint occaecat id eiusmod pariatur deserunt. Est sint enim labore consequat. Amet aute pariatur ea duis culpa esse excepteur qui laboris id minim tempor. Esse consectetur cupidatat aliqua reprehenderit nisi laboris voluptate cillum. Et adipisicing enim est sunt reprehenderit consectetur tempor nostrud duis minim consequat ipsum nisi. Consequat pariatur eu cupidatat sunt.',
    },
    {
      id: Math.random(),
      title: 'Nulla labore eiusmod aute culpa Lorem.',
      desc: 'Aute laboris nulla ex Lorem tempor excepteur. Cupidatat commodo magna duis commodo velit nostrud tempor aliquip dolore irure quis. Non veniam labore amet ad aliqua ipsum dolor sunt mollit sint non. Deserunt enim ex nostrud dolore aute commodo sint occaecat id eiusmod pariatur deserunt. Est sint enim labore consequat. Amet aute pariatur ea duis culpa esse excepteur qui laboris id minim tempor. Esse consectetur cupidatat aliqua reprehenderit nisi laboris voluptate cillum. Et adipisicing enim est sunt reprehenderit consectetur tempor nostrud duis minim consequat ipsum nisi. Consequat pariatur eu cupidatat sunt.',
    },
  ];
  return (
    <>
      <div className='text-end mt-6'>
        <SegmentedControl
          value={searchParams.get('tab') || 'news'}
          data={[
            { label: 'ข่าวสาร', value: 'news' },
            { label: 'โปรโมชั่น', value: 'promo' },
            { label: 'กิจกรรม', value: 'activity' },
          ]}
          onChange={(e) => router.push(`/news?tab=${e}`)}
        />
      </div>

      <ul
        className={`grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0 ${className}`}
      >
        {NEWS.map((news, idx) => (
          <NewsItem id={news.id} key={idx} />
        ))}
      </ul>
      <div className='mt-4 text-center'>
        <Button variant='light'>Loadmore</Button>
      </div>
    </>
  );
};

export default NewsList;
