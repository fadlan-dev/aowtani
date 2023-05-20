'use client';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';

type Props = {};

const TOUR = [
  {
    title: 'ล่องเรือบางปู',
    image:
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=960&q=80',
  },
  {
    title: 'วิถีชีวิต',
    image:
      'https://images.unsplash.com/photo-1568849676085-51415703900f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    title: 'วิถีชีวิต',
    image:
      'https://images.unsplash.com/photo-1558791985-4241e4011215?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  {
    title: 'วิถีชีวิต',
    image:
      'https://images.unsplash.com/photo-1583491470869-ca0b9fa90216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80',
  },
  {
    title: 'วิถีชีวิต',
    image:
      'https://images.unsplash.com/photo-1504203328729-b937e8e102f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80',
  },
];

const RecommendedTourPackages = (props: Props) => {
  const matches = useMediaQuery('(min-width: 768px)');
  return (
    <div className='bg-primary '>
      <div className='container pt-11 pb-6'>
        <h2 className='text-center'>แพ็กเกจทัวร์แนะนำ</h2>
        <p className='text-center'>ตอบโจทย์ทุกไลฟ์สไตล์</p>
        <div
          className={`grid ${
            matches ? 'grid-cols-4 grid-rows-2' : 'grid-cols-1 grid-rows-1'
          } gap-4 h-96 mt-4 overflow-hidden`}
        >
          {TOUR.slice(0, matches ? 5 : 1).map((item, idx) => (
            <div
              key={idx}
              className={`h-full bg-primary-100 grid place-content-center ${
                idx === 0
                  ? matches
                    ? 'col-start-1 col-end-3 row-start-1 row-end-3'
                    : ''
                  : ''
              } overflow-hidden rounded`}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={idx === 0 ? 616 : 300}
                height={idx === 0 ? 616 : 300}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedTourPackages;
