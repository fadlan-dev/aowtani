import { IBooking } from '@/types';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type ApiServiceErr = any;
export const useGetBookings = (token: string, opt?: QueryOptions<any[]>) =>
  useQuery<IBooking[], ApiServiceErr>({
    queryFn: async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/bookings.json`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(config);
      return data;
    },
    queryKey: ['bookings-query'],
  });
