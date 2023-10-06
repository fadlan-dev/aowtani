import {} from '@/types';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
  business_partner_id: number;
};

export type ApiServiceErr = any;
export const useGetBankAccounts = (
  { business_partner_id }: Props,
  opt?: QueryOptions<[]>
) =>
  useQuery<[], ApiServiceErr>({
    ...opt,
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_API_HOST}/bank_accounts.json?business_partner_id=${business_partner_id}`
      );
      return data;
    },
    queryKey: ['bank-account-query'],
  });
