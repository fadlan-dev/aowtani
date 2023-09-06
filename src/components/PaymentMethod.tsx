import { useGetBankAccounts } from '@/hooks/useGetBankAccounts';
import { cn } from '@/libs/utils';
import { IBankAccount } from '@/types';
import { Loader, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent, useCallback } from 'react';
import BANK_CI from '@/constants/BANK_CI.json';
import Empty from './Empty';

interface PaymentMethodProps {
  className?: string;
  business_partner_id: number;
}

const PaymentMethod: FunctionComponent<PaymentMethodProps> = ({
  className,
  business_partner_id,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const payment = searchParams.get('payment') || '';

  const getBankColor = useCallback(
    (slug: string) => {
      // BANK_CI.find((bank) => bank.slug === slug);
      return BANK_CI.find((bank) => bank.slug === slug)?.color;
    },
    [] // Remove 'BANK_CI' from the dependency array
  );

  const getBankProfile = useCallback(
    (slug: string) => {
      // BANK_CI.find((bank) => bank.slug === slug);
      return BANK_CI.find((bank) => bank.slug === slug)?.image || '/image.svg';
    },
    [] // Remove 'BANK_CI' from the dependency array
  );

  const {
    data: bankAccounts,
    isFetching,
    isFetched,
  } = useGetBankAccounts({
    business_partner_id: business_partner_id,
  });

  if (isFetching && !isFetched) {
    return (
      <center>
        <Loader />
      </center>
    );
  }

  return (
    <div className={cn(className)}>
      <Title order={4}>เลือกช่องทางการชำระเงิน</Title>
      <div
        className={cn(
          'grid gap-4 mt-2',
          bankAccounts?.length === 0
            ? 'grid-cols-1 sm:grid-cols-1'
            : 'grid-cols-2 sm:grid-cols-3'
        )}
      >
        {bankAccounts?.length === 0 ? (
          <center>
            <Empty />
          </center>
        ) : (
          bankAccounts?.map((bank: IBankAccount) => (
            <div
              key={bank.account_number}
              className={cn(
                'flex flex-col items-center border-[3px] border-solid p-4 rounded cursor-pointer'
              )}
              style={{
                borderColor:
                  payment === bank.account_number
                    ? getBankColor(bank.slug)
                    : '#fff',
              }}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.set('payment', bank.account_number);
                router.push(`${pathname}?${newParams}`);
              }}
            >
              {bank && (
                <div
                  className='p-1'
                  style={{ backgroundColor: getBankColor(bank.slug) }}
                >
                  <Image
                    width={32}
                    height={32}
                    src={getBankProfile(bank.slug)}
                    alt={bank.slug}
                  />
                </div>
              )}
              <Text mt='xs'>{bank.slug}</Text>
              <Text>{bank.account_number}</Text>
              <Text color='dimmed' size='sm'>
                {bank.account_name}
              </Text>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
