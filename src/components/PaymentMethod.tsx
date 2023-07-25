import { cn } from '@/libs/utils';
import { Text, Title } from '@mantine/core';
import Image from 'next/image';
import { FunctionComponent, useState } from 'react';

interface PaymentMethodProps {
  className?: string;
}

const PaymentMethod: FunctionComponent<PaymentMethodProps> = ({
  className,
}) => {
  const data = [
    {
      image: '/promptpay.svg',
      label: 'PromptPay',
      value: 'PromptPay',
      acc_no: '0105539071246',
      acc_name: 'บริษัท ปัตตานี ทัวร์ จำกัด',
      color: '#053F67',
    },

    {
      image: '/kbank.svg',
      label: 'ธนาคารกสิกรไทย',
      value: 'kbank',
      acc_no: '0105539071246',
      acc_name: 'บริษัท ปัตตานี ทัวร์ จำกัด',
      color: '#02a950',
    },
    {
      image: '/scb.svg',
      label: ' ธนาคารไทยพาณิชย์',
      value: 'scb',
      acc_no: '0105539071246',
      acc_name: 'บริษัท ปัตตานี ทัวร์ จำกัด',
      color: '#462279',
    },
  ];
  const [paymenyM, setPaymentM] = useState('PromptPay');

  return (
    <div className={cn(className)}>
      <Title order={4}>เลือกช่องทางการชำระเงิน</Title>
      <div className={cn('grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2')}>
        {data.map((d) => (
          <div
            className={cn(
              'flex flex-col items-center border-[3px] border-solid p-4 rounded cursor-pointer'
            )}
            style={{
              borderColor: paymenyM === d.value ? d.color : '#fff',
            }}
            onClick={() => setPaymentM(d.value)}
          >
            <Image width={32} height={32} src={d.image} alt={d.label} />
            <Text mt='xs'>{d.label}</Text>
            <Text>{d.acc_no}</Text>
            <Text color='dimmed' size='sm'>
              {d.acc_name}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
