import { IDestinationType } from '@/types';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type ApiServiceErr = any;
export const useGetDestinationTypes = (
  opt?: QueryOptions<IDestinationType[]>
) =>
  useQuery<IDestinationType[], ApiServiceErr>({
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_API_HOST}/destination_types.json`
      );
      return data;
    },
    queryKey: ['destination-type-query'],
  });
