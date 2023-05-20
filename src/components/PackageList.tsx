import React from 'react';
import PackageItem from './PackageItem';

type Props = {};

const PACKAGES = [
  {
    id: 234343,
    guide: 'Fit & Travel',
    name: 'Fisherman’s Village Resort ชุมชนคุณธรรมท่องเที่ยวบางปู 3 วัน 2 คืน @บ้านบาลาดูวอ จังหวัดปัตตานี',
    status: 'จองแล้ว',
    price: 2000,
    total: 3000,
  },
  {
    id: 56456345,
    guide: 'Fit & Travel',
    name: 'Fisherman’s Village Resort ชุมชนคุณธรรมท่องเที่ยวบางปู 3 วัน 2 คืน @บ้านบาลาดูวอ จังหวัดปัตตานี',
    status: 'รอชำระเงิน',
    price: 20230,
    total: 30034,
  },
  {
    id: 3456234,
    guide: 'Fit & Travel',
    name: 'Fisherman’s Village Resort ชุมชนคุณธรรมท่องเที่ยวบางปู 3 วัน 2 คืน @บ้านบาลาดูวอ จังหวัดปัตตานี',
    status: 'ล้มเหลว',
    price: 25400,
    total: 30230,
  },
];

const PackageList = (props: Props) => {
  return (
    <ul className='list-none p-0 m-0 flex flex-col gap-4'>
      {PACKAGES.map((item) => (
        <PackageItem
          key={item.id}
          id={item.id}
          guide={item.guide}
          name={item.name}
          status={item.status}
          price={item.price}
          total={item.total}
        />
      ))}
    </ul>
  );
};

export default PackageList;
