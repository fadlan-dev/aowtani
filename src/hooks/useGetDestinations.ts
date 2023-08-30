import { IDestination } from '@/types';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

type IResponse = {
  data: IDestination[];
  total: number;
};

type Props = {
  destination_type_id?: number;
  organization_id?: number;
  page?: number;
  per_page?: number;
  search?: string;
};

export type ApiServiceErr = any;
export const useGetDestinations = (
  {
    destination_type_id,
    organization_id,
    page = 1,
    per_page = 3,
    search,
  }: Props,
  opt?: QueryOptions<IResponse>
) =>
  useQuery<IResponse, ApiServiceErr>({
    ...opt,
    queryFn: async () => {
      let queryParams = '';
      if (destination_type_id) {
        queryParams += `destination_type_id=${destination_type_id}&`;
      }

      if (organization_id) {
        queryParams += `organization_id=${organization_id}&`;
      }

      if (page) {
        queryParams += `page=${page}&`;
      }
      if (per_page) {
        queryParams += `per_page=${per_page}&`;
      }

      queryParams += `search=${search || ''}`;

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/destination_visits.json?${queryParams}`
      );
      return data;
    },
    queryKey: ['destinations-query'],
  });
