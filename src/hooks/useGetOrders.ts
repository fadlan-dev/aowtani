import { IOrder } from '@/types';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type ApiServiceErr = any;
export const useGetOrdes = (token: string, opt?: QueryOptions<IOrder[]>) =>
  useQuery({
    ...opt,
    queryFn: async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_API_HOST}/orders.json`,
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
