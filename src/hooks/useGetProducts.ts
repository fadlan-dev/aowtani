import { IProduct } from '@/types';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

type IResponse = {
  data: IProduct[];
  total: number;
};

type Props = {
  page?: number;
  per_page?: number;
  organization_id?: number;
};

export type ApiServiceErr = any;
export const useGetProducts = (
  { page = 1, per_page = 3, organization_id }: Props,
  opt?: QueryOptions<IResponse>
) =>
  useQuery<IResponse, ApiServiceErr>({
    ...opt,
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/packages.json?organization_id=${organization_id}&page=${page}&per_page=${per_page}`
      );
      return data;
    },
    queryKey: ['products-query'],
  });
