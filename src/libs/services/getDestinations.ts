import { IDestination } from '@/types';
import axios from 'axios';

type props = {
  destination_type_id?: string;
  organization_id?: string;
  search?: string;
  page?: number;
  per_page?: number;
};

export interface IResponse {
  data: IDestination[];
  total: number;
}

export const getDestinations = async ({
  destination_type_id,
  organization_id,
  search = '',
  page = 1,
  per_page = 6,
}: props): Promise<IResponse> => {
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

  queryParams += `search=${search}`;

  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_API_HOST}/destination_visits.json?${queryParams}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.request(config);

    if (response.status >= 200 && response.status < 300) {
      const data: IResponse = response.data;
      return data;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error: any) {
    console.log(error)
    throw new Error(`An error occurred: ${error.message}`);
  }
};
