import { ILocalGuide } from '@/types';
import axios from 'axios';

interface props {
  page?: number;
  per_page?: number;
}

interface IResponse {
  data: ILocalGuide[];
  total: number;
}

export const getLocalGuides = async ({
  page = 1,
  per_page = 6,
}: props): Promise<IResponse> => {
  let queryParams = '';
  if (page) {
    queryParams += `page=${page}`;
  }

  if (per_page) {
    queryParams += `per_page=${per_page}`;
  }

  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}/local_guides.json?${queryParams}`,
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
    throw new Error(`An error occurred: ${error.message}`);
  }
};
