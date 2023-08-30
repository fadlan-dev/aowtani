import { IPackage } from '@/types';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

type IResponse = {
  data: IPackage[];
  total: number;
};

export type ApiServiceErr = any;
export const useGetPackages = (
  organization_id?: number,
  opt?: QueryOptions<IResponse>
) =>
  useQuery<IResponse, ApiServiceErr>({
    ...opt,
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/packages.json?organization_id=${organization_id}&page=1&per_page=3`
      );
      return data;
    },
    queryKey: ['packages-query'],
  });
