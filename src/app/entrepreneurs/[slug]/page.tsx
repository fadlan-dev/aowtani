import { useParams } from 'next/navigation';
import React from 'react';

type Props = {
  params: { slug: string };
};

const Page = ({ params }: Props) => {
  return (
    <div className=' mt-20'>
      <h3 className='text-center'>News {params.slug}</h3>
    </div>
  );
};

export default Page;
