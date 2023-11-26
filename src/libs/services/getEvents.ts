import { IEvent } from '@/types';
import axios from 'axios';

interface props {
  start_date?: string;
  end_date?: string;
}

export const getEvents = async ({
  start_date = '',
  end_date = '',
}: props): Promise<IEvent[]> => {
  let queryParams = '';
  if (start_date) {
    queryParams += `start_date=${start_date}&`;
  }

  if (end_date) {
    queryParams += `end_date=${end_date}&`;
  }

  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_API_HOST}/tani_events.json?${queryParams}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.request(config);

    if (response.status >= 200 && response.status < 300) {
      const data: IEvent[] = response.data;
      return data;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error: any) {
    throw new Error(`An error occurred: ${error.message}`);
  }
};
