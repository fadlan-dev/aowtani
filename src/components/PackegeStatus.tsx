import React from 'react';

type Props = {
  status: 'จองแล้ว' | 'รอชำระเงิน' | 'ล้มเหลว' | string;
};

const PackegeStatus = ({ status }: Props) => {
  const color =
    status === 'จองแล้ว'
      ? 'text-green-400'
      : status === 'รอชำระเงิน'
      ? 'text-yellow-400'
      : 'text-red-400';
  return <span className={`${color} font-semibold`}>{status}</span>;
};

export default PackegeStatus;
