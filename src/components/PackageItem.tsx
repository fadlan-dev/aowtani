import { numberFormat } from '@/libs/utils';
import React from 'react';
import PackegeStatus from './PackegeStatus';
import { useRouter } from 'next/navigation';

type Props = {
  id: number | string;
  guide: string;
  name: string;
  status: string;
  price: number | string;
  total: number | string;
};

const PackageItem = ({ id, guide, name, status, price, total }: Props) => {
  const router = useRouter();
  return (
    <li
      className='border border-zinc-200 border-solid rounded p-4 cursor-pointer hover:shadow'
      onClick={() => router.push(`/travel/${id}`)}
    >
      <div className='flex justify-between border-0 border-b border-zinc-200 border-solid pb-4'>
        <p>{guide}</p>
        <p className=' text-zinc-500'>
          สถานะ <PackegeStatus status={status} />
        </p>
      </div>
      <div className='flex flex-row justify-between gap-2 py-4'>
        <div className='flex flex-row gap-2'>
          <div className=' w-28 aspect-video bg-zinc-200' />
          <p>{name}</p>
        </div>
        <p className=''>{numberFormat(price)}</p>
      </div>
      <div className='text-end border-0 border-t border-zinc-200 border-solid pt-4'>
        <p>ยอดสั้งซื้อทั้งหมด {numberFormat(total)}</p>
      </div>
    </li>
  );
};

export default PackageItem;
