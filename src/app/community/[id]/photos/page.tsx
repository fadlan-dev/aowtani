import React from 'react';

type Props = {
  params: { id: string };
};

const page = ({ params }: Props) => {
  return (
    <div>
      <h1 className=' mt-28'>{params.id}</h1>
    </div>
  );
};

export default page;
