'use client';
import { Button, Paper } from '@mantine/core';
import { FunctionComponent } from 'react';
import Comment from './Comment';
import { cn } from '@/libs/utils';
import { useParams, useRouter } from 'next/navigation';

interface ReviewsProps {
  className?: string;
  exploreTo?: string;
}

const Reviews: FunctionComponent<ReviewsProps> = ({ className, exploreTo }) => {
  const router = useRouter();

  const REVIEWS = [
    {
      key: 0,
      image: '',
      name: 'ManDo',
      postedAt: +new Date(),
      body: 'This Pokémon likes to lick its palms that are sweetened by being soaked in honey. Teddiursa concocts its own honey by blending fruits and pollen collected by Beedrill. Blastoise has water spouts that protrude from its shell. The water spouts are very accurate',
    },
    {
      key: 1,
      image: '',
      name: 'Sir lancelot',
      postedAt: +new Date(),
      body: ' Officia sint consequat consectetur ad cupidatat culpa. Irure duis veniam est ea in voluptate pariatur esse sit et dolor irure. Labore do ipsum dolor culpa. Consectetur eu voluptate aliquip aute deserunt ad. Consectetur commodo duis eu laboris qui officia et sit ea veniam laborum. Mollit enim aute dolor veniam proident enim culpa in tempor occaecat irure ex. In incididunt sit consectetur enim officia. Dolore veniam veniam commodo ad non do ea enim aute veniam ea. Qui tempor Lorem ut fugiat ad amet magna consectetur irure. Ea dolor laborum reprehenderit sint. Sint ut velit cupidatat consectetur cupidatat excepteur do duis enim qui velit id. Irure culpa occaecat dolore sit eiusmod fugiat nisi.',
    },
  ];
  return (
    <div className={cn(className, 'flex flex-col gap-2')}>
      <div className='text-end'>
        <Button variant='subtle'>แสดงความคิดเห็น</Button>
      </div>
      {REVIEWS.map((review) => (
        <Comment key={review.key} data={review} />
      ))}
      {exploreTo && (
        <div className='text-center'>
          <Button variant='light' onClick={() => router.push(exploreTo)}>
            ดูทั้งหมด
          </Button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
