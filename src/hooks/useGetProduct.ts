import { IProduct } from '@/types';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
  id?: number | string;
};

export type ApiServiceErr = any;
export const useGetProduct = ({ id }: Props, opt?: QueryOptions<IProduct>) =>
  useQuery<IProduct, ApiServiceErr>({
    ...opt,
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}.json`
      );
      return data;
    },
    queryKey: ['product-query'],
  });
