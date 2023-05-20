import { numberFormat } from '@/libs/utils';
import { IconMapPinFilled } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  id: number | string;
};

const TravelItem = ({ id }: Props) => {
  const router = useRouter();
  return (
    <li
      className='aspect-square bg-zinc-100 relative rounded overflow-hidde cursor-pointer'
      onClick={() => router.push(`/travel/${id}`)}
    >
      <div className=' absolute left-0 bottom-0 right-0 p-4'>
        <p className=' text-lg font-semibold'>ร้านชบา โรตี</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <IconMapPinFilled size={14} />
            <p>เมืองปัตตานี</p>
          </div>
          <p>
            ราคา <span className='font-semibold'>{numberFormat(23343)}</span>{' '}
          </p>
        </div>
      </div>
    </li>
  );
};

export default TravelItem;
