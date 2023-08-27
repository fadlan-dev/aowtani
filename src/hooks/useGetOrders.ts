import { IDestinationType } from '@/types';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type ApiServiceErr = any;
export const useGetOrdes = (token: string, opt?: QueryOptions<any[]>) =>
  useQuery<IDestinationType[], ApiServiceErr>({
    queryFn: async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/orders.json`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(config);
      return data;
    },
    queryKey: ['orders-query'],
  });
